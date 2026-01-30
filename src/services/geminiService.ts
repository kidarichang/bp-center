import { GoogleGenerativeAI } from "@google/generative-ai";
import { BPCenter, AISearchResult } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const searchExternalBP = async (location: string, centers: BPCenter[]): Promise<AISearchResult> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      console.error("Gemini API Key is not configured");
      return {
        ids: [],
        reason: "API 키가 설정되지 않았습니다. 관리자에게 문의해주세요."
      };
    }

    const centerContext = centers.map(c => ({ 
      id: c.id, 
      name: c.name, 
      address: c.address 
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `사용자가 한국의 특정 지역("${location}")을 검색했습니다. 

1. 먼저 "${location}"이 한국의 어느 시/도, 구, 동에 위치하는지 정확히 파악하세요. (예: 둔산동은 대전광역시 서구)
2. 파악된 위치와 지리적으로 가장 가까운 BP센터를 아래 리스트에서 최대 5개 선정하세요.
3. 선정 기준:
   - 같은 "구"에 있다면 1순위
   - 같은 "시"에 있다면 2순위
   - 인접한 인근 시/도라면 3순위 (약 15km 이내)

절대 주의사항: 검색어가 대전 지역이면 대전 센터를, 부산 지역이면 부산 센터를 추천해야 합니다. 엉뚱한 타 지역(예: 부산 검색했는데 서울 추천)을 추천하지 마세요.

BP센터 리스트: ${JSON.stringify(centerContext)}

반드시 아래 JSON 형식으로만 응답하세요:
{
  "recommendedIds": [숫자 배열],
  "reason": "추천 이유 설명"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ids: parsed.recommendedIds as number[],
        reason: parsed.reason as string
      };
    }
    
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return {
      ids: [],
      reason: "지리적 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    };
  }
};
