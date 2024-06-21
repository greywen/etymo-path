export const WORD_PROMPT = `请帮我将单词分解音标和读音
例如：conversation
自然拼读拆分: ['con','ver','sa','tion'] 音标(美): ['/ˌkɒn/','/vər/','/ˈseɪ/','/ʃən/']
自然发音拆分：['c','o','n','v','er','s','a','tion']  音标(美):['/k/','/ɒ/','/n/','/v/','/ə/','/s/','/eɪ/','/ʃn/']
重点：常见组合发音(音标)/元音(音标)组合发音/音素组合/音节组合/很多单词中都出现过短单词(音标)组合请不要拆分!!!
注意：单词拆分后的字母与音标数组长度一定是一致的
只需要输出JSON格式:
{"chinese": "交谈，谈话；会话","phonetic": "/ˌkɒnvərˈseɪʃən/","natureSplit: ['con','ver','sa','tion'],"naturePhoneticSplit": ['/ˌkɒn/','/vər/','/ˈseɪ/','/ʃən/'],"split":['c','o','n','v','er','s','a','tion'],"phoneticSplit": ['/k/','/ɒ/','/n/','/v/','/ə/','/s/','/eɪ/','/ʃn/']}`;
