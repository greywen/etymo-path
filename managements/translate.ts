import { WORD_PROMPT } from '@/constants/constants';
import { OpenAIWordResult } from '@/type/services/word';
import { OpenAI, MessageRole } from '@services/openai';

export default class TranslateManagement {
  static async openAI(value: string) {
    const MAX_RETRY = 5;
    let retry = 0;
    const messages = [
      { role: MessageRole.system, content: WORD_PROMPT },
      { role: MessageRole.user, content: value },
    ];

    let word = {} as OpenAIWordResult;

    try {
      while (retry <= MAX_RETRY) {
        word = await OpenAI(messages);
        if (
          word.natureSplit.length === word.naturePhoneticSplit.length ||
          word.split.length === word.phoneticSplit.length
        ) {
          break;
        }
        ++retry;
      }
    } catch (error) {
      throw error;
    }
    return word;
  }
}
