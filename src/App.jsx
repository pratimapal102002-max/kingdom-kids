import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   KINGDOM KIDS — JESUS ARMY BIBLE ADVENTURE
   Complete Vite React app — src/App.jsx
   ============================================================ */

/* ---------------- FONTS / GLOBAL STYLE ---------------- */
function FontLink() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap');

      * { box-sizing: border-box; }
      html, body, #root { height: 100%; margin: 0; padding: 0; }

      .kk-root {
        --kk-indigo: #1B1464;
        --kk-purple: #4C2A85;
        --kk-violet: #7C5CFC;
        --kk-gold: #F0B90B;
        --kk-gold-soft: #FCE7A8;
        --kk-pink: #F7B8D0;
        --kk-cream: #FFF9EE;
        --kk-white: #FFFFFF;
        --kk-ink: #241A45;
        --kk-green: #2E9E6B;
        --kk-red: #D6556B;
        font-family: 'Noto Sans Devanagari', 'Poppins', sans-serif;
        color: var(--kk-ink);
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        min-height: 100vh;
      }
      .kk-display { font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; }
      .kk-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
      .kk-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35); border-radius: 10px; }

      @keyframes kk-twinkle {
        0%, 100% { opacity: 0.25; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      @keyframes kk-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes kk-glow {
        0%, 100% { box-shadow: 0 0 0px rgba(240,185,11,0.0); }
        50% { box-shadow: 0 0 28px rgba(240,185,11,0.55); }
      }
      @keyframes kk-pop {
        0% { transform: scale(0.6); opacity: 0; }
        70% { transform: scale(1.08); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes kk-shine {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .kk-star { animation: kk-twinkle 2.4s ease-in-out infinite; }
      .kk-float { animation: kk-float 4.5s ease-in-out infinite; }
      .kk-glow { animation: kk-glow 2.6s ease-in-out infinite; }
      .kk-pop { animation: kk-pop 0.45s cubic-bezier(.3,1.4,.4,1) both; }
      .kk-shine {
        background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 45%, transparent 60%);
        background-size: 200% 100%;
        animation: kk-shine 2.8s ease-in-out infinite;
      }
      .kk-card-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
      .kk-card-btn:active { transform: scale(0.96); }
      @media (hover:hover) {
        .kk-card-btn:hover { transform: translateY(-3px); }
      }
      input, textarea, button { font-family: inherit; }
    `}</style>
  );
}

/* ============================================================
   CHAPTER DATA (24 chapters, as supplied)
   ============================================================ */
const RAW_CHAPTERS = [
  { id: 1, name: "परमेश्वर को पहला स्थान दो", verseRef: "नीतिवचन 6:4", verse: "तू न तो अपनी आँखों में नींद, और न अपनी पलकों में झपकी आने दे।", storyRef: "नीतिवचन 6:1–5", story: "यहाँ हमें सिखाया गया है कि यदि हमने जल्दबाज़ी में कोई गलत वादा कर दिया है, तो उसे टालना नहीं चाहिए, बल्कि तुरंत सही कदम उठाना चाहिए।", example: "यदि किसी बच्चे ने दोस्त से कोई ऐसी चीज़ देने का वादा कर दिया जो वह दे नहीं सकता, तो उसे झूठ बोलने के बजाय तुरंत सच बताकर बात ठीक करनी चाहिए।", learned: "अपनी गलती को टालना नहीं चाहिए। परमेश्वर को अपने जीवन में पहला स्थान देना चाहिए और गलत वादों को जल्दी सुधारना चाहिए।", icon: "🕊️",
    missionPrompt: "एक बच्चे ने दोस्त से ऐसा वादा कर दिया जो वह पूरा नहीं कर सकता। उसे क्या करना चाहिए?",
    missionOptions: [{ t: "तुरंत सच बताकर बात ठीक करे", c: true }, { t: "बात को टाल दे और भूल जाए", c: false }, { t: "झूठ बोलकर बच निकले", c: false }] },
  { id: 2, name: "परमेश्वर में आनंद पाओ", verseRef: "भजन संहिता 37:4", verse: "यहोवा को अपने सुख का मूल जान और वह तेरे मनोरथों को पूरा करेगा।", storyRef: "1 शमूएल 17:32–50", story: "दाऊद ने गोलियत जैसे बड़े शत्रु से डरने के बजाय परमेश्वर पर भरोसा रखा। उसका आनंद और भरोसा परमेश्वर में था।", example: "जब किसी बच्चे को मनपसंद खिलौना या चीज़ नहीं मिलती, तब भी वह दुखी होकर शिकायत करने के बजाय प्रार्थना, वचन और आराधना में आनंद पा सकता है।", learned: "सच्ची खुशी वस्तुओं में नहीं, बल्कि परमेश्वर के साथ संबंध में है।", icon: "🎯",
    missionPrompt: "मनपसंद चीज़ न मिलने पर बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "शिकायत करते रहे", c: false }, { t: "प्रार्थना और आराधना में आनंद पाए", c: true }, { t: "दूसरों से जलन रखे", c: false }] },
  { id: 3, name: "चिंता नहीं, प्रार्थना करो", verseRef: "फिलिप्पियों 4:6–7", verse: "किसी भी बात की चिन्ता मत करो; परन्तु हर एक बात में तुम्हारे निवेदन, प्रार्थना और विनती के द्वारा धन्यवाद के साथ परमेश्‍वर के सम्मुख उपस्थित किए जाएँ…", storyRef: "1 शमूएल 1:9–20", story: "हन्ना बहुत दुखी थी, लेकिन उसने चिंता में डूबने के बजाय परमेश्वर के सामने प्रार्थना की। परमेश्वर ने उसकी प्रार्थना सुनी।", example: "Exam का डर होने पर बच्चा बार-बार चिंता करने के बजाय पढ़ाई करे और फिर परमेश्वर से प्रार्थना करे।", learned: "हर चिंता परमेश्वर के सामने रखनी चाहिए और धन्यवाद के साथ प्रार्थना करनी चाहिए।", icon: "🙏",
    missionPrompt: "Exam का डर लगने पर सही काम क्या है?", missionOptions: [{ t: "पढ़ाई करे और प्रार्थना करे", c: true }, { t: "बस चिंता करता रहे", c: false }, { t: "पढ़ाई छोड़ दे", c: false }] },
  { id: 4, name: "परमेश्वर का भय ही बुद्धि की शुरुआत है", verseRef: "नीतिवचन 9:10", verse: "यहोवा का भय मानना बुद्धि का आरम्भ है, और परम पवित्र ईश्वर को जानना ही समझ है।", storyRef: "1 राजा 3:3–15", story: "परमेश्वर ने सुलैमान से पूछा कि वह क्या चाहता है। सुलैमान ने धन या लंबी आयु नहीं, बल्कि बुद्धि माँगी ताकि वह लोगों का सही न्याय कर सके।", example: "जब कोई बच्चा cheating करने का मौका पाता है, तो वह परमेश्वर का आदर करते हुए cheating नहीं करता।", learned: "परमेश्वर का आदर करना ही सच्ची बुद्धि की शुरुआत है।", icon: "👑",
    missionPrompt: "Exam में cheating का मौका मिलने पर सुलैमान जैसी बुद्धि क्या कहती है?", missionOptions: [{ t: "मौके का फायदा उठाए", c: false }, { t: "परमेश्वर का आदर करते हुए मना करे", c: true }, { t: "दोस्तों की नकल करे", c: false }] },
  { id: 5, name: "पवित्र जीवन जीओ", verseRef: "इब्रानियों 12:14", verse: "सब से मेल मिलाप रखो, और उस पवित्रता के खोजी हो जिसके बिना कोई प्रभु को कदापि न देखेगा।", storyRef: "दानिय्येल 1:8–20", story: "दानिय्येल ने राजा के भोजन से अपने आपको अशुद्ध करने से मना किया और परमेश्वर के प्रति विश्वासयोग्य रहा।", example: "यदि दोस्त गलत वीडियो देखने या गलत काम करने को कहें, तो बच्चा मना कर दे।", learned: "गलत कामों से दूर रहना, पवित्र जीवन जीना और परमेश्वर की आज्ञा मानना चाहिए।", icon: "🛡️",
    missionPrompt: "दोस्त गलत वीडियो देखने को कहे तो दानिय्येल जैसा बच्चा क्या करेगा?", missionOptions: [{ t: "मना कर देगा", c: true }, { t: "दोस्त की बात मान लेगा", c: false }, { t: "चुपचाप देख लेगा", c: false }] },
  { id: 6, name: "परमेश्वर अपने बच्चों की अगुवाई करते हैं", verseRef: "भजन संहिता 43:3", verse: "अपने प्रकाश और अपनी सच्चाई को भेज; वे मेरी अगुवाई करें…", storyRef: "निर्गमन 13:21–22", story: "परमेश्वर ने इस्राएलियों को दिन में बादल और रात में आग के खम्भे के द्वारा मार्ग दिखाया।", example: "नए school या नए स्थान पर जाते समय बच्चा डरने के बजाय परमेश्वर से सही मार्गदर्शन माँगे।", learned: "परमेश्वर अपने बच्चों को अकेला नहीं छोड़ता। वह हमेशा उनकी अगुवाई करता है।", icon: "🔥",
    missionPrompt: "नए school में जाने से पहले बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "परमेश्वर से मार्गदर्शन माँगे", c: true }, { t: "बहुत डरा रहे", c: false }, { t: "स्कूल जाने से मना करे", c: false }] },
  { id: 7, name: "परमेश्वर का आदर करो", verseRef: "नीतिवचन 14:27", verse: "यहोवा का भय मानना, जीवन का सोता है, और उसके द्वारा लोग मृत्यु के फंदे से बच जाते हैं।", storyRef: "1 शमूएल 3:1–10", story: "शमूएल ने परमेश्वर की आवाज़ सुनी और उत्तर दिया, 'कह, क्योंकि तेरा दास सुन रहा है।'", example: "जब माता-पिता या शिक्षक अच्छी बात सिखाएँ, तो बच्चे को ध्यान से सुनना और आज्ञा मानना चाहिए।", learned: "परमेश्वर का आदर करना, उसकी आवाज़ सुनना और उसकी आज्ञा मानना चाहिए।", icon: "👂",
    missionPrompt: "शमूएल की तरह जब माता-पिता कुछ अच्छा सिखाएँ, तो बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "ध्यान से सुने और माने", c: true }, { t: "अनसुना कर दे", c: false }, { t: "बहस करे", c: false }] },
  { id: 8, name: "डाँट और सुधार स्वीकार करो", verseRef: "नीतिवचन 15:32", verse: "जो शिक्षा को सुनी अनसुनी करता, वह अपने प्राण को तुच्छ जानता है, परंतु जो डाँट को सुनता, वह बुद्धि प्राप्त करता है।", storyRef: "योना 1–3", story: "योना ने पहले परमेश्वर की आज्ञा नहीं मानी, लेकिन बाद में उसने अपनी गलती समझी और परमेश्वर की आज्ञा पूरी की।", example: "यदि teacher बच्चे को डाँटकर सही बात बताए, तो बच्चा गुस्सा न करे, बल्कि 'Sorry' बोलकर सुधार करे।", learned: "Correction को बुरा नहीं मानना चाहिए। अपनी गलती स्वीकार करके सुधारना चाहिए।", icon: "📘",
    missionPrompt: "Teacher डाँटकर सही बात बताए तो बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "गुस्सा करे", c: false }, { t: "Sorry बोलकर सुधार करे", c: true }, { t: "जवाब में बहस करे", c: false }] },
  { id: 9, name: "हिम्मत रखो", verseRef: "यहोशू 1:9", verse: "हियाव बाँधकर दृढ़ हो जा; भय न खा… क्योंकि जहां-जहां तू जाएगा वहां वहां तेरा परमेश्वर यहोवा तेरे संग रहेगा।", storyRef: "यहोशू 6:1–20", story: "इस्राएलियों ने परमेश्वर की आज्ञा मानी और बिना डर के यरीहो की दीवारों के चारों ओर चले। परमेश्वर ने उन्हें विजय दी।", example: "किसी कठिन exam, competition या नई responsibility से डरने के बजाय बच्चा परमेश्वर पर भरोसा रखे।", learned: "हमें डरना नहीं चाहिए, क्योंकि परमेश्वर हमारे साथ है।", icon: "⚔️",
    missionPrompt: "कठिन exam या competition से पहले बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "डरकर पीछे हट जाए", c: false }, { t: "परमेश्वर पर भरोसा रखे और हिम्मत करे", c: true }, { t: "बहाना बनाकर टाल दे", c: false }] },
  { id: 10, name: "यीशु की शक्ति से सब कुछ सम्भव है", verseRef: "फिलिप्पियों 4:13", verse: "जो मुझे सामर्थ्य देता है, उसमें मैं सब कुछ कर सकता हूँ।", storyRef: "मत्ती 14:22–33", story: "पतरस ने यीशु पर ध्यान रखकर पानी पर कदम रखा। जब उसने तूफान को देखा तो डर गया और डूबने लगा।", example: "जब कोई काम कठिन लगे, तो बच्चा 'मैं नहीं कर सकता' कहने के बजाय प्रार्थना करके कोशिश करे।", learned: "हम अपनी शक्ति से नहीं, बल्कि यीशु की सामर्थ्य से कठिन काम कर सकते हैं।", icon: "🌊",
    missionPrompt: "काम कठिन लगे तो बच्चे को क्या सोचना चाहिए?", missionOptions: [{ t: "'मैं नहीं कर सकता' कहकर छोड़ दे", c: false }, { t: "प्रार्थना करके कोशिश करे", c: true }, { t: "दूसरों को दोष दे", c: false }] },
  { id: 11, name: "शिकायत नहीं, प्रार्थना और आज्ञा का पालन", verseRef: "निर्गमन 15:25–26", verse: "तब मूसा ने यहोवा की दोहाई दी, और यहोवा ने उसको एक लकड़ी दिखाई…", storyRef: "निर्गमन 15:22–26", story: "इस्राएली कड़वे पानी के कारण शिकायत करने लगे। मूसा ने परमेश्वर से प्रार्थना की और परमेश्वर ने पानी को मीठा कर दिया।", example: "जब घर में मनपसंद खाना न बने, तो शिकायत करने के बजाय धन्यवाद देना और प्रार्थना करना चाहिए।", learned: "परेशानी में शिकायत नहीं, बल्कि प्रार्थना और परमेश्वर की आज्ञा का पालन करना चाहिए।", icon: "💧",
    missionPrompt: "मनपसंद खाना न बनने पर क्या करना सही है?", missionOptions: [{ t: "धन्यवाद दे और प्रार्थना करे", c: true }, { t: "शिकायत करता रहे", c: false }, { t: "खाना खाने से मना करे", c: false }] },
  { id: 12, name: "परमेश्वर से बुद्धि माँगो", verseRef: "याकूब 1:5–8", verse: "पर यदि तुम में से किसी को बुद्धि की घटी हो तो परमेश्वर से मांगे, जो बिना उलाहना दिए सबको उदारता से देता है और उसको दी जाएगी…", storyRef: "दानिय्येल 2:17–23, 27–28", story: "राजा ने एक सपना देखा जिसका अर्थ कोई नहीं बता सका। दानिय्येल ने अपने दोस्तों के साथ परमेश्वर से प्रार्थना की। परमेश्वर ने उसे सपना और उसका अर्थ बता दिया।", example: "जब बच्चे को कोई कठिन decision लेना हो, तो वह केवल दोस्तों की बात न माने, बल्कि परमेश्वर से बुद्धि माँगे।", learned: "सच्ची बुद्धि परमेश्वर से आती है। हमें विश्वास से उससे बुद्धि माँगनी चाहिए।", icon: "💡",
    missionPrompt: "कठिन decision लेने से पहले बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "सिर्फ दोस्तों की बात माने", c: false }, { t: "परमेश्वर से बुद्धि माँगे", c: true }, { t: "बिना सोचे फैसला करे", c: false }] },
  { id: 13, name: "एक-दूसरे से प्रेम करो", verseRef: "1 यूहन्ना 4:7", verse: "हे प्रियो, हम आपस में प्रेम रखें; क्योंकि प्रेम परमेश्वर से है…", storyRef: "लूका 10:25–37", story: "एक घायल व्यक्ति को देखकर कई लोग आगे निकल गए, लेकिन एक सामरी ने उसकी मदद की और उसकी देखभाल की।", example: "यदि कोई बच्चा गिर जाए या अकेला बैठा हो, तो उसका मज़ाक उड़ाने के बजाय उसकी मदद करनी चाहिए।", learned: "सच्चा प्रेम केवल बोलने से नहीं, बल्कि मदद करने और अच्छे काम करने से दिखाई देता है।", icon: "❤️",
    missionPrompt: "कोई बच्चा गिर जाए तो सामरी जैसा बच्चा क्या करेगा?", missionOptions: [{ t: "मज़ाक उड़ाएगा", c: false }, { t: "उसकी मदद करेगा", c: true }, { t: "अनदेखा करके निकल जाएगा", c: false }] },
  { id: 14, name: "दूसरों को क्षमा करो", verseRef: "इफिसियों 4:32", verse: "एक दूसरे पर कृपालु और करुणामय हो, और जैसे परमेश्‍वर ने मसीह में तुम्हारे अपराध क्षमा किए, वैसे ही तुम भी एक दूसरे के अपराध क्षमा करो।", storyRef: "उत्पत्ति 45:1–15", story: "यूसुफ के भाइयों ने उसके साथ बुरा किया था, लेकिन जब वे उसके सामने आए तो यूसुफ ने उन्हें बदला लेने के बजाय क्षमा कर दिया।", example: "यदि दोस्त ने आपकी pencil या खिलौना खराब कर दिया, तो गुस्सा रखने के बजाय उसे क्षमा करना चाहिए।", learned: "जैसे परमेश्वर ने हमें क्षमा किया, वैसे ही हमें भी दूसरों को क्षमा करना चाहिए।", icon: "🤝",
    missionPrompt: "दोस्त ने खिलौना खराब कर दिया, यूसुफ जैसा बच्चा क्या करेगा?", missionOptions: [{ t: "उसे क्षमा कर देगा", c: true }, { t: "बदला लेगा", c: false }, { t: "दोस्ती तोड़ देगा", c: false }] },
  { id: 15, name: "अपने शब्दों पर नियंत्रण रखो", verseRef: "नीतिवचन 15:1", verse: "कोमल उत्तर सुनने से गुस्सा ठण्डा हो जाता है, परन्तु कटुवचन से क्रोध भड़क उठता है।", storyRef: "1 शमूएल 25", story: "अबीगैल ने बुद्धिमानी और कोमल शब्दों से दाऊद के क्रोध को शांत किया।", example: "यदि भाई या बहन गुस्से में कुछ कह दें, तो हमें भी चिल्लाने के बजाय शांत होकर जवाब देना चाहिए।", learned: "गुस्से में कठोर शब्द नहीं बोलने चाहिए। बोलने से पहले सोचना चाहिए।", icon: "🕊️",
    missionPrompt: "भाई-बहन गुस्से में कुछ बोलें तो अबीगैल जैसा बच्चा क्या करेगा?", missionOptions: [{ t: "शांत होकर कोमल जवाब देगा", c: true }, { t: "चिल्लाकर जवाब देगा", c: false }, { t: "मारपीट करेगा", c: false }] },
  { id: 16, name: "अपने समय का सही उपयोग करो", verseRef: "इफिसियों 5:15–16", verse: "इसलिये ध्यान से देखो, कि कैसी चाल चलते हो: निर्बुद्धियों के समान नहीं पर बुद्धिमानों के समान चलो। अवसर को बहुमूल्य समझो…", storyRef: "नहेमायाह 2:11–20", story: "नहेमायाह ने समय बर्बाद नहीं किया। उसने परमेश्वर के काम को प्राथमिकता दी और लोगों के साथ मिलकर दीवार बनाने का काम शुरू किया।", example: "बच्चा पूरा समय mobile या games में न लगाए, बल्कि पढ़ाई, प्रार्थना, Bible reading और घर के कामों के लिए भी समय निकाले।", learned: "समय बहुत कीमती है। हमें उसका सही और बुद्धिमानी से उपयोग करना चाहिए।", icon: "⏳",
    missionPrompt: "समय के सही उपयोग के लिए बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "पूरा दिन mobile पर games खेले", c: false }, { t: "पढ़ाई, प्रार्थना और घर के काम के लिए समय निकाले", c: true }, { t: "समय की परवाह न करे", c: false }] },
  { id: 17, name: "सच बोलो", verseRef: "इफिसियों 4:25", verse: "इस कारण झूठ बोलना छोड़कर हर एक अपने पड़ोसी से सच बोले, क्योंकि हम आपस में एक दूसरे के अंग हैं।", storyRef: "2 राजा 5:20–27", story: "गेहजी ने लालच में आकर झूठ बोला और नामान से वस्तुएँ ले लीं। उसके झूठ के कारण उसे दण्ड मिला।", example: "यदि बच्चे ने homework नहीं किया है, तो झूठ बोलने के बजाय teacher को सच बताना चाहिए।", learned: "गलती छिपाने के लिए झूठ नहीं बोलना चाहिए। हर परिस्थिति में सच बोलना चाहिए।", icon: "📖",
    missionPrompt: "Homework न होने पर बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "झूठ बोलकर बहाना बनाए", c: false }, { t: "Teacher को सच बताए", c: true }, { t: "Homework किसी और से करवाकर छुपाए", c: false }] },
  { id: 18, name: "भलाई करने में हिम्मत मत हारो", verseRef: "गलातियों 6:9", verse: "हम भले काम करने में साहस न छोड़ें, क्योंकि यदि हम ढीले न हों तो ठीक समय पर कटनी काटेंगे।", storyRef: "नहेमायाह 4:1–20", story: "जब लोग नहेमायाह का मज़ाक उड़ाने और डराने लगे, तब भी उन्होंने दीवार बनाने का अच्छा काम नहीं छोड़ा।", example: "यदि बच्चा रोज़ किसी की मदद करता है लेकिन कोई धन्यवाद नहीं देता, तो भी उसे भलाई करना बंद नहीं करना चाहिए।", learned: "अच्छे काम करते समय हिम्मत नहीं हारनी चाहिए। परमेश्वर सही समय पर फल देगा।", icon: "🌾",
    missionPrompt: "किसी की मदद करने पर धन्यवाद न मिले तो बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "मदद करना बंद कर दे", c: false }, { t: "फिर भी भलाई करता रहे", c: true }, { t: "गुस्सा होकर शिकायत करे", c: false }] },
  { id: 19, name: "दूसरों को जल्दी Judge मत करो", verseRef: "मत्ती 7:1", verse: "दोष मत लगाओ, कि तुम पर भी दोष न लगाया जाए।", storyRef: "मत्ती 7:1–5", story: "यीशु ने सिखाया कि हमें दूसरों की छोटी गलती देखने से पहले अपनी बड़ी गलतियों को देखना चाहिए।", example: "यदि कोई बच्चा meeting में देर से आए, तो तुरंत यह नहीं सोचना चाहिए कि वह लापरवाह है। हो सकता है उसके पास कोई समस्या रही हो।", learned: "दूसरों को तुरंत Judge नहीं करना चाहिए। पहले अपनी गलती देखनी चाहिए और फिर प्रेम से दूसरों की मदद करनी चाहिए।", icon: "⚖️",
    missionPrompt: "कोई देर से आए तो सही सोच क्या है?", missionOptions: [{ t: "तुरंत उसे लापरवाह समझ ले", c: false }, { t: "समझे कि कोई कारण रहा होगा और प्रेम से पेश आए", c: true }, { t: "सबके सामने उसकी बुराई करे", c: false }] },
  { id: 20, name: "परमेश्वर का धन्यवाद करो", verseRef: "1 थिस्सलुनीकियों 5:18", verse: "हर बात में धन्यवाद करो; क्योंकि तुम्हारे लिये मसीह यीशु में परमेश्वर की यही इच्छा है।", storyRef: "लूका 17:11–19", story: "यीशु ने दस कोढ़ियों को चंगा किया, लेकिन उनमें से केवल एक वापस आया और यीशु को धन्यवाद दिया।", example: "मम्मी खाना बनाएँ, कोई मदद करे या परमेश्वर हमें सुरक्षित रखे, तो हमें 'धन्यवाद' कहना चाहिए।", learned: "छोटी-बड़ी हर blessing के लिए परमेश्वर को धन्यवाद देना चाहिए।", icon: "🙌",
    missionPrompt: "जब परमेश्वर हमें आशीष दे, तो हमें क्या करना चाहिए?", missionOptions: [{ t: "भूल जाएँ", c: false }, { t: "धन्यवाद दें", c: true }, { t: "और मांगते रहें बिना धन्यवाद के", c: false }] },
  { id: 21, name: "अच्छी संगति चुनो", verseRef: "1 कुरिन्थियों 15:33", verse: "धोखा न खाना, बुरी संगति अच्छे चरित्र को बिगाड़ देती है।", storyRef: "रूत 1:6–18", story: "रूत ने नाओमी को छोड़ने के बजाय उसके साथ रहने का निर्णय लिया। उसने विश्वासयोग्य और अच्छी संगति को चुना।", example: "यदि दोस्त पढ़ाई, प्रार्थना और अच्छे कामों में मदद करते हैं, तो उनकी संगति अच्छी है। लेकिन यदि वे झूठ या गलत काम करने को कहें, तो उनसे सावधान रहना चाहिए।", learned: "हमें ऐसे दोस्तों को चुनना चाहिए जो हमें सही रास्ते और यीशु के करीब ले जाएँ।", icon: "🌿",
    missionPrompt: "कौन सी संगति अच्छी है?", missionOptions: [{ t: "जो झूठ और गलत काम सिखाए", c: false }, { t: "जो पढ़ाई, प्रार्थना और अच्छे काम में मदद करे", c: true }, { t: "जो सिर्फ मौज-मस्ती सिखाए", c: false }] },
  { id: 22, name: "नम्र बनो, दूसरों को महत्व दो", verseRef: "फिलिप्पियों 2:3–4", verse: "विरोध या झूठी बड़ाई के लिये कुछ न करो, पर दीनता से एक दूसरे को अपने से अच्छा समझो…", storyRef: "यूहन्ना 13:3–5", story: "यीशु प्रभु और गुरु होते हुए भी नम्र बने और अपने शिष्यों के पैर धोए।", example: "यदि कोई बच्चा class में सबसे अच्छा है, तो उसे घमण्ड नहीं करना चाहिए, बल्कि दूसरों की मदद करनी चाहिए।", learned: "हमें खुद को सबसे बड़ा नहीं समझना चाहिए। नम्र होकर दूसरों को महत्व देना चाहिए।", icon: "🧺",
    missionPrompt: "Class में सबसे अच्छा बच्चा क्या करेगा?", missionOptions: [{ t: "घमण्ड करेगा", c: false }, { t: "नम्र रहकर दूसरों की मदद करेगा", c: true }, { t: "दूसरों को नीचा दिखाएगा", c: false }] },
  { id: 23, name: "परमेश्वर पर भरोसा रखो", verseRef: "नीतिवचन 3:5–6", verse: "तू अपनी समझ का सहारा न लेना, वरन् सम्पूर्ण मन से यहोवा पर भरोसा रखना। अपनी सारी चालचलन में उसी को स्मरण करना, तब वह तेरे लिये सीधा मार्ग निकालेगा।", storyRef: "उत्पत्ति 12:1–4", story: "परमेश्वर ने अब्राहम से अपना देश और घर छोड़कर उस स्थान पर जाने को कहा जिसे परमेश्वर दिखाएगा। अब्राहम ने बिना पूरा रास्ता जाने भी परमेश्वर पर भरोसा किया।", example: "जब बच्चा नए school, नए काम या भविष्य को लेकर confused हो, तो उसे परमेश्वर पर भरोसा करना चाहिए।", learned: "हमें हर बात अपनी समझ से नहीं, बल्कि परमेश्वर पर भरोसा करके करनी चाहिए।", icon: "🧭",
    missionPrompt: "भविष्य को लेकर confused होने पर बच्चे को क्या करना चाहिए?", missionOptions: [{ t: "केवल अपनी समझ पर भरोसा करे", c: false }, { t: "परमेश्वर पर भरोसा करे", c: true }, { t: "घबराकर हार मान ले", c: false }] },
  { id: 24, name: "गलत काम के लालच में मत आओ", verseRef: "याकूब 1:12", verse: "धन्य है वह मनुष्य जो परीक्षा में स्थिर रहता है, क्योंकि वह खरा निकलकर जीवन का वह मुकुट पाएगा जिसकी प्रतिज्ञा उसने अपने प्रेम करनेवालों से की है।", storyRef: "उत्पत्ति 39:7–12", story: "पोतिफर की पत्नी ने यूसुफ को गलत काम के लिए लालच दिया, लेकिन यूसुफ ने मना कर दिया और वहाँ से भाग गया।", example: "यदि दोस्त कहें, 'यह गलत काम करो, किसी को पता नहीं चलेगा,' तो बच्चे को कहना चाहिए, 'नहीं, यह काम परमेश्वर को पसंद नहीं आएगा।'", learned: "गलत काम का मौका मिलने पर भी सही रास्ता चुनना चाहिए। हमें परमेश्वर को प्रसन्न करने वाला जीवन जीना चाहिए।", icon: "👑",
    missionPrompt: "दोस्त गलत काम करने को कहे और बोले 'किसी को पता नहीं चलेगा' तो यूसुफ जैसा बच्चा क्या करेगा?", missionOptions: [{ t: "मौके का फायदा उठाएगा", c: false }, { t: "मना कर देगा क्योंकि परमेश्वर देख रहा है", c: true }, { t: "सोचने के लिए समय माँगेगा", c: false }] },
];

function oralQuestionsFor(ch) {
  return [
    "इस Chapter का नाम क्या है?",
    "Memory Verse का Reference क्या है? (" + ch.verseRef + ")",
    "Memory Verse सुनाओ।",
    "इस Chapter की Bible Story क्या थी?",
    "इस Chapter से हमने क्या सीखा?",
    "Real-Life Example क्या था?",
  ];
}

const CHAPTERS = RAW_CHAPTERS.map(function (c) {
  return Object.assign({}, c, { oralQuestions: oralQuestionsFor(c) });
});

const RANKS = [
  { min: 0, name: "New Bible Explorer", icon: "🌱" },
  { min: 3, name: "Little Disciple", icon: "📖" },
  { min: 6, name: "Faith Learner", icon: "🕯️" },
  { min: 9, name: "Word Warrior", icon: "⚔️" },
  { min: 14, name: "Prayer Warrior", icon: "🙏" },
  { min: 19, name: "Jesus Army Soldier", icon: "🛡️" },
  { min: 24, name: "Kingdom Champion", icon: "👑" },
];

const BADGES = [
  { at: 1, id: "word-learner", name: "Word Learner", icon: "📖" },
  { at: 3, id: "little-explorer", name: "Little Explorer", icon: "🧭" },
  { at: 6, id: "faith-learner", name: "Faith Learner", icon: "🕯️" },
  { at: 9, id: "love-builder", name: "Love Builder", icon: "❤️" },
  { at: 12, id: "word-warrior", name: "Word Warrior", icon: "⚔️" },
  { at: 15, id: "truth-speaker", name: "Truth Speaker", icon: "🌟" },
  { at: 18, id: "bible-champion", name: "Bible Champion", icon: "🏆" },
  { at: 21, id: "courage-soldier", name: "Courage Soldier", icon: "🔥" },
  { at: 24, id: "jesus-army-graduate", name: "Jesus Army Graduate", icon: "🎓" },
];

const DAILY_CHALLENGES = [
  "एक Memory Verse सुनाओ",
  "एक Chapter का नाम बताओ",
  "एक सीख (lesson) समझाओ",
  "एक प्रार्थना करो",
  "किसी दूसरे बच्चे की मदद करो",
  "यीशु से एक बात बताओ जो तुमने सीखी",
];

/* ============================================================
   100 BIBLE-INSPIRED AVATARS (50 male / 50 female)
   ============================================================ */
const MALE_NAMES = [
  "Adam", "Noah", "Abraham", "Isaac", "Jacob", "Joseph", "Moses", "Aaron", "Joshua", "Caleb",
  "Gideon", "Samson", "Samuel", "Saul", "David", "Solomon", "Elijah", "Elisha", "Isaiah", "Jeremiah",
  "Ezekiel", "Daniel", "Jonah", "Nehemiah", "Ezra", "Boaz", "Obed", "Jesse", "Nathan", "Josiah",
  "Hezekiah", "Amos", "Micah", "Malachi", "Peter", "Andrew", "James", "John", "Philip", "Thomas",
  "Matthew", "Bartholomew", "Simon", "Jude", "Paul", "Barnabas", "Timothy", "Titus", "Silas", "Stephen",
];

const FEMALE_NAMES = [
  "Eve", "Sarah", "Rebekah", "Rachel", "Leah", "Miriam", "Deborah", "Ruth", "Naomi", "Hannah",
  "Abigail", "Esther", "Mary", "Elizabeth", "Martha", "Lydia", "Priscilla", "Dorcas", "Tamar", "Rahab",
  "Bathsheba", "Michal", "Zipporah", "Jochebed", "Huldah", "Anna", "Joanna", "Susanna", "Salome", "Eunice",
  "Lois", "Phoebe", "Junia", "Claudia", "Damaris", "Rhoda", "Keturah", "Hagar", "Dinah", "Shiphrah",
  "Puah", "Jael", "Peninnah", "Zeruiah", "Atarah", "Naamah", "Milcah", "Zilpah", "Bilhah", "Orpah",
];

const BOY_ICONS = ["👦", "🧑", "🧒", "👨", "🧑‍🦱", "🧑‍🦰", "🧑‍🦳", "🧑‍🦲", "🧔", "🤴"];
const GIRL_ICONS = ["👧", "👩", "🧒", "🧑‍🦱", "🧑‍🦰", "🧑‍🦳", "💁‍♀️", "🙆‍♀️", "👸", "🤰"];
const AVATAR_COLORS = ["#F0B90B", "#7C5CFC", "#2E9E6B", "#D6556B", "#3B82C4", "#E08E45", "#C2569D", "#4FB4A6", "#8E6BC9", "#E4B85A", "#57B894", "#D67C9B"];

const AVATARS = [].concat(
  MALE_NAMES.map(function (name, i) {
    return {
      id: "m" + (i + 1),
      name: name,
      gender: "male",
      icon: BOY_ICONS[i % BOY_ICONS.length],
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    };
  }),
  FEMALE_NAMES.map(function (name, i) {
    return {
      id: "f" + (i + 1),
      name: name,
      gender: "female",
      icon: GIRL_ICONS[i % GIRL_ICONS.length],
      color: AVATAR_COLORS[(i + 4) % AVATAR_COLORS.length],
    };
  })
);

function findAvatar(avatarId) {
  var found = null;
  for (var i = 0; i < AVATARS.length; i++) {
    if (AVATARS[i].id === avatarId) { found = AVATARS[i]; break; }
  }
  return found || AVATARS[0];
}

/* ============================================================
   STORAGE (Vite / browser localStorage)
   ============================================================ */
const ACCOUNTS_KEY = "kk_accounts_v1";
const ACTIVE_KEY = "kk_active_username_v1";

function loadAccounts() {
  try {
    var raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveAccounts(accounts) {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    /* best effort only */
  }
}

function loadActiveUsername() {
  try {
    return window.localStorage.getItem(ACTIVE_KEY) || null;
  } catch (e) {
    return null;
  }
}

function saveActiveUsername(username) {
  try {
    if (username) {
      window.localStorage.setItem(ACTIVE_KEY, username);
    } else {
      window.localStorage.removeItem(ACTIVE_KEY);
    }
  } catch (e) {
    /* best effort only */
  }
}

function rankFor(n) {
  var result = RANKS[0];
  for (var i = 0; i < RANKS.length; i++) {
    if (n >= RANKS[i].min) result = RANKS[i];
  }
  return result;
}

function badgesFor(n) {
  return BADGES.filter(function (b) { return n >= b.at; });
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function createAccount(username, pin, avatarId) {
  return {
    username: username,
    pin: pin,
    avatarId: avatarId,
    xp: 0,
    faithPoints: 0,
    streak: 0,
    lastActive: null,
    demoMode: false,
    completedChapters: {},
    oralStatus: {},
    dailyDone: {},
    createdAt: new Date().toISOString(),
  };
}

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
function Stars(props) {
  var count = props.count || 14;
  var items = [];
  for (var i = 0; i < count; i++) {
    items.push(
      <span
        key={i}
        className="kk-star"
        style={{
          position: "absolute",
          borderRadius: "9999px",
          background: "#fff",
          width: 2 + (i % 3),
          height: 2 + (i % 3),
          top: ((i * 37) % 100) + "%",
          left: ((i * 53) % 100) + "%",
          animationDelay: (i % 7) * 0.3 + "s",
        }}
      />
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {items}
    </div>
  );
}

function SkyBg(props) {
  var className = props.className || "";
  return (
    <div
      className={"relative w-full min-h-full overflow-hidden " + className}
      style={{ background: "radial-gradient(ellipse at 50% -10%, #3B2E7A 0%, #1B1464 55%, #100B3B 100%)" }}
    >
      <Stars />
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] h-40 opacity-30 blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(240,185,11,0.5), transparent 70%)" }}
      />
      <div className="relative z-10">{props.children}</div>
    </div>
  );
}

function GoldButton(props) {
  var className = props.className || "";
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={"kk-card-btn kk-display relative overflow-hidden rounded-2xl px-6 py-3 font-bold text-[15px] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed " + className}
      style={{
        background: "linear-gradient(180deg, #FCE7A8 0%, #F0B90B 60%, #D9A200 100%)",
        color: "#3A2400",
        boxShadow: "0 6px 0 #a9770a, 0 10px 18px rgba(0,0,0,0.35)",
        border: "none",
      }}
    >
      <span className="relative z-10">{props.children}</span>
      <span className="kk-shine absolute inset-0" />
    </button>
  );
}

function GhostButton(props) {
  var className = props.className || "";
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={"kk-card-btn kk-display rounded-2xl px-5 py-2.5 font-semibold text-[14px] border-2 border-white/30 text-white/90 bg-white/10 backdrop-blur-sm disabled:opacity-40 " + className}
    >
      {props.children}
    </button>
  );
}

function Pill(props) {
  var tone = props.tone || "violet";
  var tones = {
    violet: "bg-[#7C5CFC]/20 text-[#E4DBFF] border-[#7C5CFC]/40",
    gold: "bg-[#F0B90B]/20 text-[#FCE7A8] border-[#F0B90B]/40",
    green: "bg-[#2E9E6B]/20 text-[#B7F0D6] border-[#2E9E6B]/40",
    pink: "bg-[#F7B8D0]/20 text-[#FBE2ED] border-[#F7B8D0]/40",
  };
  return (
    <span className={"inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] font-semibold " + tones[tone]}>
      {props.children}
    </span>
  );
}

function TopBar(props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <button
        onClick={props.onBack}
        className="kk-card-btn flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-white/90 text-sm font-semibold border border-white/15"
      >
        ← वापस
      </button>
      <h1 className="kk-display text-white text-base sm:text-lg font-bold text-center flex-1 mx-2 truncate">{props.title}</h1>
      <div className="w-[64px] flex justify-end">{props.right}</div>
    </div>
  );
}

function AvatarBubble(props) {
  var avatar = props.avatar;
  var size = props.size || 56;
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(160deg, " + avatar.color + "cc, " + avatar.color + "55)",
        border: "2px solid rgba(255,255,255,0.35)",
        fontSize: size * 0.55,
      }}
    >
      {avatar.icon}
    </div>
  );
}

/* ============================================================
   PROFILE PICKER / LOGIN SCREENS
   ============================================================ */
function ProfilePicker(props) {
  var accounts = props.accounts;
  var usernames = Object.keys(accounts);
  return (
    <SkyBg className="min-h-screen flex flex-col items-center px-6 py-10">
      <div className="kk-float text-6xl mb-3">📖✨</div>
      <h1 className="kk-display text-white text-2xl sm:text-3xl font-extrabold mb-1 text-center">🌸 KINGDOM KIDS</h1>
      <p className="kk-display text-[#FCE7A8] text-base font-bold mb-6 text-center">⚔️ JESUS ARMY — Bible Adventure</p>

      {usernames.length > 0 && (
        <div className="w-full max-w-sm mb-6">
          <p className="text-white/60 text-xs font-semibold mb-3 text-center">अपना Soldier चुनें</p>
          <div className="flex flex-col gap-2">
            {usernames.map(function (u) {
              var acc = accounts[u];
              var avatar = findAvatar(acc.avatarId);
              var completed = Object.keys(acc.completedChapters || {}).length;
              return (
                <button
                  key={u}
                  onClick={function () { props.onSelect(u); }}
                  className="kk-card-btn flex items-center gap-3 rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-3 text-left"
                >
                  <AvatarBubble avatar={avatar} size={48} />
                  <div className="flex-1">
                    <p className="text-white kk-display font-bold text-[15px]">{acc.username}</p>
                    <p className="text-white/50 text-[11px]">{completed}/24 Missions</p>
                  </div>
                  <span className="text-white/40 text-lg">→</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <GoldButton onClick={props.onAddNew} className="w-full max-w-sm">➕ नया Soldier बनाएं</GoldButton>
    </SkyBg>
  );
}

function PinEntry(props) {
  var username = props.username;
  var [pin, setPin] = useState("");
  var [error, setError] = useState("");

  function submit() {
    if (pin.length !== 4) {
      setError("4-digit PIN डालें");
      return;
    }
    var ok = props.onSubmit(pin);
    if (!ok) {
      setError("गलत PIN, फिर से कोशिश करें");
      setPin("");
    }
  }

  return (
    <SkyBg className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="text-5xl mb-3">🔐</div>
      <h2 className="kk-display text-white text-xl font-bold mb-1">{username}, अपना PIN डालें</h2>
      <p className="text-white/50 text-sm mb-6">4-अंकों का PIN</p>

      <input
        value={pin}
        onChange={function (e) {
          var v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
          setPin(v);
          setError("");
        }}
        type="password"
        inputMode="numeric"
        maxLength={4}
        placeholder="••••"
        className="w-full max-w-[200px] rounded-2xl border-2 border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/30 text-center kk-display text-2xl font-bold tracking-[0.5em] outline-none focus:border-[#F0B90B]"
      />

      {error && <p className="text-[#F3A6B5] text-xs mt-3">{error}</p>}

      <div className="flex flex-col gap-3 w-full max-w-[240px] mt-8">
        <GoldButton onClick={submit}>Enter →</GoldButton>
        <GhostButton onClick={props.onBack}>← अन्य Profile चुनें</GhostButton>
      </div>
    </SkyBg>
  );
}

function AvatarGrid(props) {
  var [tab, setTab] = useState("male");
  var filtered = AVATARS.filter(function (a) { return a.gender === tab; });
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3 justify-center">
        <button
          onClick={function () { setTab("male"); }}
          className={"kk-card-btn rounded-full px-4 py-1.5 text-xs font-bold border " + (tab === "male" ? "bg-[#F0B90B] text-[#3A2400] border-[#F0B90B]" : "border-white/25 text-white/70")}
        >
          👦 Boys
        </button>
        <button
          onClick={function () { setTab("female"); }}
          className={"kk-card-btn rounded-full px-4 py-1.5 text-xs font-bold border " + (tab === "female" ? "bg-[#F0B90B] text-[#3A2400] border-[#F0B90B]" : "border-white/25 text-white/70")}
        >
          👧 Girls
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto kk-scroll p-1">
        {filtered.map(function (a) {
          var selected = props.selectedId === a.id;
          return (
            <button
              key={a.id}
              onClick={function () { props.onSelect(a.id); }}
              className={"kk-card-btn flex flex-col items-center gap-1 rounded-xl border-2 px-1 py-2 " + (selected ? "border-[#F0B90B] bg-[#F0B90B]/15" : "border-white/10 bg-white/5")}
              title={a.name}
            >
              <AvatarBubble avatar={a} size={38} />
              <span className="text-white/70 text-[9px] font-semibold truncate w-full text-center">{a.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SignupScreen(props) {
  var [username, setUsername] = useState("");
  var [avatarId, setAvatarId] = useState(AVATARS[0].id);
  var [pin, setPin] = useState("");
  var [confirmPin, setConfirmPin] = useState("");
  var [error, setError] = useState("");

  function submit() {
    var name = username.trim();
    if (!name) { setError("अपना नाम लिखें"); return; }
    if (props.usernameExists(name)) { setError("यह नाम पहले से है, दूसरा नाम चुनें"); return; }
    if (pin.length !== 4) { setError("4-अंकों का PIN चुनें"); return; }
    if (pin !== confirmPin) { setError("PIN मेल नहीं खाता"); return; }
    props.onCreate(name, pin, avatarId);
  }

  return (
    <SkyBg className="min-h-screen flex flex-col items-center px-6 py-8">
      <div className="text-4xl mb-2">🛡️</div>
      <h2 className="kk-display text-white text-xl font-bold mb-4 text-center">नया Young Soldier बनाएं</h2>

      <input
        value={username}
        onChange={function (e) { setUsername(e.target.value); setError(""); }}
        placeholder="अपना नाम लिखें..."
        className="w-full max-w-sm rounded-2xl border-2 border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/40 text-center kk-display text-lg font-semibold outline-none focus:border-[#F0B90B] mb-4"
      />

      <p className="text-white/70 text-sm font-semibold mb-2">अपना Avatar चुनें:</p>
      <div className="w-full max-w-sm mb-4">
        <AvatarGrid selectedId={avatarId} onSelect={setAvatarId} />
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-2">
        <div>
          <p className="text-white/60 text-[11px] mb-1">4-अंकों का PIN</p>
          <input
            value={pin}
            onChange={function (e) { setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4)); setError(""); }}
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-3 py-2 text-white text-center kk-display text-lg tracking-[0.4em] outline-none focus:border-[#F0B90B]"
          />
        </div>
        <div>
          <p className="text-white/60 text-[11px] mb-1">PIN दोबारा लिखें</p>
          <input
            value={confirmPin}
            onChange={function (e) { setConfirmPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4)); setError(""); }}
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-3 py-2 text-white text-center kk-display text-lg tracking-[0.4em] outline-none focus:border-[#F0B90B]"
          />
        </div>
      </div>

      {error && <p className="text-[#F3A6B5] text-xs mb-2">{error}</p>}

      <div className="flex flex-col gap-3 w-full max-w-sm mt-4">
        <GoldButton onClick={submit}>Soldier बनें →</GoldButton>
        <GhostButton onClick={props.onBack}>← वापस</GhostButton>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function StatCard(props) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <div className="text-xl mb-1">{props.icon}</div>
      <div className="text-white kk-display text-lg font-bold leading-none">{props.value}</div>
      <div className="text-white/55 text-[11px] mt-1">{props.label}</div>
    </div>
  );
}

function Dashboard(props) {
  var profile = props.profile;
  var completed = Object.keys(profile.completedChapters).length;
  var oralPassed = Object.keys(profile.oralStatus).filter(function (id) { return profile.oralStatus[id] === "pass"; }).length;
  var rank = rankFor(completed);
  var avatar = findAvatar(profile.avatarId);

  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="मेरा Dashboard" onBack={props.onLogout} />
      <div className="px-5 sm:px-6">
        <div className="kk-glow flex items-center gap-4 rounded-2xl border border-[#F0B90B]/30 bg-white/5 px-5 py-4 mb-5">
          <AvatarBubble avatar={avatar} size={56} />
          <div className="flex-1">
            <p className="text-white kk-display text-lg font-bold">Soldier {profile.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <Pill tone="gold">{rank.icon} {rank.name}</Pill>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <StatCard icon="🌟" label="Total XP" value={profile.xp} />
          <StatCard icon="📖" label="Chapters" value={completed + "/24"} />
          <StatCard icon="🎤" label="Oral Passed" value={oralPassed} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard icon="🔥" label="Streak" value={profile.streak + " दिन"} />
          <StatCard icon="🛡️" label="Badges" value={badgesFor(completed).length} />
          <StatCard icon="❤️" label="Faith Points" value={profile.faithPoints} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GoldButton onClick={function () { props.onNav("map"); }} className="col-span-2">🗺️ Chapter Map</GoldButton>
          <GhostButton onClick={function () { props.onNav("revision"); }}>📚 Revision Camp</GhostButton>
          <GhostButton onClick={function () { props.onNav("challenge"); }}>🎲 Surprise Challenge</GhostButton>
          <GhostButton onClick={function () { props.onNav("daily"); }}>🔥 Daily Challenge</GhostButton>
          <GhostButton onClick={function () { props.onNav("badges"); }}>🏆 My Rewards</GhostButton>
          <GhostButton onClick={function () { props.onNav("certificate"); }} className="col-span-2">🎓 Certificate</GhostButton>
          <GhostButton onClick={function () { props.onNav("teacher"); }} className="col-span-2">👩‍🏫 Didi's Control Panel</GhostButton>
          <GhostButton onClick={props.onSwitchProfile} className="col-span-1">🔄 Switch Profile</GhostButton>
          <GhostButton onClick={props.onLogout} className="col-span-1">🚪 Logout</GhostButton>
        </div>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   CHAPTER MAP
   ============================================================ */
function ChapterMap(props) {
  var profile = props.profile;
  var completedCount = Object.keys(profile.completedChapters).length;
  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="24 Mission Map" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CHAPTERS.map(function (ch, idx) {
          var prevId = idx > 0 ? CHAPTERS[idx - 1].id : null;
          var unlocked = profile.demoMode || idx === 0 || !!profile.completedChapters[prevId];
          var done = !!profile.completedChapters[ch.id];
          return (
            <button
              key={ch.id}
              disabled={!unlocked}
              onClick={function () { if (unlocked) props.onOpenChapter(ch.id); }}
              className={"kk-card-btn relative rounded-2xl border-2 px-3 py-4 text-left " + (
                done ? "border-[#2E9E6B]/60 bg-[#2E9E6B]/10" :
                unlocked ? "border-[#F0B90B]/50 bg-white/5" :
                "border-white/10 bg-white/[0.03] opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{unlocked ? ch.icon : "🔒"}</span>
                {done && <span className="text-[11px]">✅</span>}
              </div>
              <p className="text-white/50 text-[10px] font-bold kk-display">MISSION {ch.id}</p>
              <p className="text-white text-[12.5px] font-semibold leading-snug mt-0.5">{ch.name}</p>
              {!unlocked && <p className="text-white/40 text-[10px] mt-1">पिछला Mission पूरा करें</p>}
            </button>
          );
        })}
      </div>
      <p className="text-center text-white/40 text-xs mt-6">{completedCount}/24 Missions Completed</p>
    </SkyBg>
  );
}

/* ============================================================
   CHAPTER DETAIL (Learn / Mission / Oral Test)
   ============================================================ */
function SectionBlock(props) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3.5 mb-3">
      <p className="text-[#FCE7A8] text-[12px] font-bold kk-display mb-1.5 flex items-center gap-1.5">{props.icon} {props.label}</p>
      <div className="text-white/90 text-[14px] leading-relaxed">{props.children}</div>
    </div>
  );
}

function MissionTab(props) {
  var chapter = props.chapter;
  var [picked, setPicked] = useState(null);
  var [checked, setChecked] = useState(false);

  var correctIdx = -1;
  chapter.missionOptions.forEach(function (o, i) { if (o.c) correctIdx = i; });
  var isCorrect = picked === correctIdx;

  function submit() {
    if (picked === null) return;
    setChecked(true);
  }

  return (
    <div>
      <SectionBlock label="Bible Mission" icon="🎯">{chapter.missionPrompt}</SectionBlock>

      <div className="flex flex-col gap-2 mb-4">
        {chapter.missionOptions.map(function (o, i) {
          var style = "border-white/15 bg-white/5 text-white/90";
          if (checked && i === correctIdx) style = "border-[#2E9E6B] bg-[#2E9E6B]/15 text-white";
          else if (checked && i === picked && i !== correctIdx) style = "border-[#D6556B] bg-[#D6556B]/15 text-white";
          else if (!checked && picked === i) style = "border-[#F0B90B] bg-[#F0B90B]/10 text-white";
          return (
            <button
              key={i}
              disabled={checked}
              onClick={function () { setPicked(i); }}
              className={"kk-card-btn rounded-xl border-2 px-4 py-3 text-left text-[14px] font-medium " + style}
            >
              {o.t}
            </button>
          );
        })}
      </div>

      {!checked ? (
        <GoldButton disabled={picked === null} onClick={submit} className="w-full">उत्तर जांचें</GoldButton>
      ) : isCorrect ? (
        <div className="kk-pop text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="text-white kk-display font-bold">Very Good, Young Soldier!</p>
          <p className="text-white/60 text-sm mb-3">परमेश्वर के वचन में बढ़ते रहो!</p>
          <GoldButton onClick={function () { props.onComplete(true); }} className="w-full">+100 XP ⭐ लें</GoldButton>
        </div>
      ) : (
        <div className="kk-pop text-center">
          <p className="text-2xl mb-1">💪</p>
          <p className="text-white kk-display font-bold">Needs More Practice</p>
          <p className="text-white/60 text-sm mb-3">कोई बात नहीं, फिर से कोशिश करो!</p>
          <div className="flex gap-2">
            <GhostButton className="flex-1" onClick={function () { setPicked(null); setChecked(false); }}>फिर से प्रयास करें</GhostButton>
            <GoldButton className="flex-1" onClick={function () { props.onComplete(false); }}>आगे बढ़ें</GoldButton>
          </div>
        </div>
      )}
      {props.alreadyDone && <p className="text-center text-[#B7F0D6] text-xs mt-3">✅ यह Mission पहले ही पूरा हो चुका है</p>}
    </div>
  );
}

function OralTestTab(props) {
  var chapter = props.chapter;
  var [answers, setAnswers] = useState({});
  var [listening, setListening] = useState(null);
  var recogRef = useRef(null);
  var supportsSpeech = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function startSpeech(qi) {
    if (!supportsSpeech) return;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recog = new SR();
    recog.lang = "hi-IN";
    recog.interimResults = false;
    recog.onresult = function (e) {
      var text = e.results[0][0].transcript;
      setAnswers(function (a) {
        var next = Object.assign({}, a);
        next[qi] = (a[qi] ? a[qi] + " " : "") + text;
        return next;
      });
    };
    recog.onend = function () { setListening(null); };
    recog.onerror = function () { setListening(null); };
    recogRef.current = recog;
    setListening(qi);
    recog.start();
  }

  function stopSpeech() {
    if (recogRef.current) recogRef.current.stop();
    setListening(null);
  }

  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "hi-IN";
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <SectionBlock label="मौखिक परीक्षा (Oral Test)" icon="🎤">
        नीचे हर सवाल का उत्तर बोलकर या टाइप करके दें। पूरा होने पर Didi/Parent आपका उत्तर जांचेंगे।
      </SectionBlock>

      {chapter.oralQuestions.map(function (q, qi) {
        return (
          <div key={qi} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-white text-[13.5px] font-semibold flex-1">{qi + 1}. {q}</p>
              <button onClick={function () { speak(q); }} className="text-lg shrink-0" title="Read Question">🔊</button>
            </div>
            <textarea
              value={answers[qi] || ""}
              onChange={function (e) {
                setAnswers(function (a) {
                  var next = Object.assign({}, a);
                  next[qi] = e.target.value;
                  return next;
                });
              }}
              placeholder="अपना उत्तर यहाँ लिखें..."
              rows={2}
              className="w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-white/90 text-[13px] placeholder-white/30 outline-none focus:border-[#F0B90B]"
            />
            {supportsSpeech && (
              <div className="flex gap-2 mt-2">
                {listening === qi ? (
                  <GhostButton className="!py-1.5 !px-3 text-xs" onClick={stopSpeech}>⏹ Stop</GhostButton>
                ) : (
                  <GhostButton className="!py-1.5 !px-3 text-xs" onClick={function () { startSpeech(qi); }}>🎤 Start Speaking</GhostButton>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-2xl border border-[#F0B90B]/30 bg-white/5 px-4 py-3.5 mt-4">
        <p className="text-[#FCE7A8] text-[12.5px] font-bold mb-2">👩‍🏫 Didi/Parent — इस Oral Test को mark करें:</p>
        <p className="text-white/50 text-[11px] mb-3">ध्यान दें: App verse का उच्चारण automatically judge नहीं करता — Didi/Parent ही सही जांच करेंगे।</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={function () { props.onMark("pass"); }} className={"kk-card-btn rounded-xl px-4 py-2 text-xs font-bold border-2 " + (props.currentStatus === "pass" ? "border-[#2E9E6B] bg-[#2E9E6B]/20 text-white" : "border-white/15 text-white/70 bg-white/5")}>✅ Correct</button>
          <button onClick={function () { props.onMark("almost"); }} className={"kk-card-btn rounded-xl px-4 py-2 text-xs font-bold border-2 " + (props.currentStatus === "almost" ? "border-[#F0B90B] bg-[#F0B90B]/20 text-white" : "border-white/15 text-white/70 bg-white/5")}>🟡 Almost Correct</button>
          <button onClick={function () { props.onMark("practice"); }} className={"kk-card-btn rounded-xl px-4 py-2 text-xs font-bold border-2 " + (props.currentStatus === "practice" ? "border-[#D6556B] bg-[#D6556B]/20 text-white" : "border-white/15 text-white/70 bg-white/5")}>🔁 Needs Practice</button>
        </div>
      </div>
    </div>
  );
}

function ChapterDetail(props) {
  var chapter = props.chapter;
  var profile = props.profile;
  var [tab, setTab] = useState("learn");
  var done = !!profile.completedChapters[chapter.id];
  var oralStatus = profile.oralStatus[chapter.id];

  return (
    <SkyBg className="min-h-screen pb-12">
      <TopBar title={"Mission " + chapter.id} onBack={function () { props.onNav("map"); }} />
      <div className="px-5 sm:px-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-1">{chapter.icon}</div>
          <h2 className="kk-display text-white text-xl font-bold">{chapter.name}</h2>
          {done && <Pill tone="green">✅ Completed</Pill>}
        </div>

        <div className="flex gap-2 mb-4 bg-white/5 rounded-2xl p-1.5 border border-white/10">
          {[
            { id: "learn", label: "📖 सीखें" },
            { id: "mission", label: "🎯 अभ्यास" },
            { id: "oral", label: "🎤 मौखिक परीक्षा" },
          ].map(function (t) {
            return (
              <button
                key={t.id}
                onClick={function () { setTab(t.id); }}
                className={"flex-1 rounded-xl py-2 text-[12px] font-bold kk-display " + (tab === t.id ? "bg-[#F0B90B] text-[#3A2400]" : "text-white/70")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "learn" && (
          <div>
            <SectionBlock label={"Memory Verse — " + chapter.verseRef} icon="📖">“{chapter.verse}”</SectionBlock>
            <SectionBlock label={"Bible Story — " + chapter.storyRef} icon="📜">{chapter.story}</SectionBlock>
            <SectionBlock label="Real-Life Example" icon="🏡">{chapter.example}</SectionBlock>
            <SectionBlock label="हमने क्या सीखा?" icon="❤️">{chapter.learned}</SectionBlock>
            <GoldButton onClick={function () { setTab("mission"); }} className="w-full mt-1">आगे Mission शुरू करें →</GoldButton>
          </div>
        )}

        {tab === "mission" && (
          <MissionTab
            chapter={chapter}
            alreadyDone={done}
            onComplete={function (correct) { props.onCompleteMission(chapter.id, correct); }}
          />
        )}

        {tab === "oral" && (
          <OralTestTab
            chapter={chapter}
            currentStatus={oralStatus}
            onMark={function (status) { props.onMarkOral(chapter.id, status); }}
          />
        )}
      </div>
    </SkyBg>
  );
}

/* ============================================================
   REVISION CAMP
   ============================================================ */
function RevisionCamp(props) {
  var profile = props.profile;
  var [filter, setFilter] = useState("all");
  var filtered = CHAPTERS.filter(function (ch) {
    var done = !!profile.completedChapters[ch.id];
    var oral = profile.oralStatus[ch.id];
    if (filter === "done") return done;
    if (filter === "todo") return !done;
    if (filter === "practice") return oral === "practice";
    return true;
  });
  var filters = [
    { id: "all", label: "सभी" },
    { id: "todo", label: "बाकी" },
    { id: "done", label: "पूरे" },
    { id: "practice", label: "Needs Practice" },
  ];
  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="📚 Revision Camp" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6">
        <div className="flex gap-2 overflow-x-auto kk-scroll mb-4 pb-1">
          {filters.map(function (f) {
            return (
              <button
                key={f.id}
                onClick={function () { setFilter(f.id); }}
                className={"shrink-0 rounded-full px-4 py-1.5 text-xs font-bold border " + (filter === f.id ? "bg-[#F0B90B] text-[#3A2400] border-[#F0B90B]" : "border-white/20 text-white/70")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map(function (ch) {
            return (
              <button
                key={ch.id}
                onClick={function () { props.onOpenChapter(ch.id); }}
                className="kk-card-btn flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left"
              >
                <span className="text-2xl">{ch.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-[13px] font-semibold">Ch {ch.id}. {ch.name}</p>
                  <p className="text-white/40 text-[11px]">{ch.verseRef}</p>
                </div>
                {profile.completedChapters[ch.id] && <span>✅</span>}
              </button>
            );
          })}
          {filtered.length === 0 && <p className="text-white/40 text-sm text-center py-8">इस filter में कोई chapter नहीं</p>}
        </div>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   RANDOM CHALLENGE
   ============================================================ */
function RandomChallenge(props) {
  var [chapter, setChapter] = useState(function () { return CHAPTERS[Math.floor(Math.random() * CHAPTERS.length)]; });
  var [revealed, setRevealed] = useState(false);
  var [awarded, setAwarded] = useState(false);

  function next() {
    setChapter(CHAPTERS[Math.floor(Math.random() * CHAPTERS.length)]);
    setRevealed(false);
    setAwarded(false);
  }

  return (
    <SkyBg className="min-h-screen pb-10 flex flex-col">
      <TopBar title="🎲 Surprise Bible Challenge" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="kk-glow w-full max-w-sm rounded-2xl border border-[#F0B90B]/40 bg-white/5 px-5 py-6 mb-5">
          <p className="text-3xl mb-2">{chapter.icon}</p>
          <p className="text-white/70 text-xs mb-2">कौन सा Chapter सिखाता है...</p>
          <p className="text-white kk-display font-bold text-[15px] leading-relaxed">“{chapter.learned}”</p>
        </div>

        {!revealed ? (
          <GoldButton onClick={function () { setRevealed(true); }} className="w-full max-w-sm">उत्तर देखें</GoldButton>
        ) : (
          <div className="kk-pop w-full max-w-sm">
            <div className="rounded-2xl border border-[#2E9E6B]/50 bg-[#2E9E6B]/10 px-4 py-3 mb-4">
              <p className="text-white/60 text-xs">Answer:</p>
              <p className="text-white font-bold kk-display">Chapter {chapter.id} — {chapter.name}</p>
            </div>
            {!awarded ? (
              <GoldButton
                className="w-full"
                onClick={function () {
                  props.onAwardFaith(20);
                  setAwarded(true);
                }}
              >
                Correct! +20 Faith Points लें
              </GoldButton>
            ) : (
              <GhostButton className="w-full" onClick={next}>अगला Challenge →</GhostButton>
            )}
          </div>
        )}
      </div>
    </SkyBg>
  );
}

/* ============================================================
   DAILY CHALLENGE
   ============================================================ */
function DailyChallenge(props) {
  var profile = props.profile;
  var idx = new Date().getDate() % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var done = !!profile.dailyDone[todayStr()];
  return (
    <SkyBg className="min-h-screen pb-10 flex flex-col">
      <TopBar title="🔥 Today's Kingdom Challenge" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">🔥</div>
        <div className="kk-glow w-full max-w-sm rounded-2xl border border-[#F0B90B]/40 bg-white/5 px-5 py-6 mb-6">
          <p className="text-white kk-display font-bold text-lg">{challenge}</p>
        </div>
        {done ? (
          <Pill tone="green">✅ आज का Challenge पूरा हुआ</Pill>
        ) : (
          <GoldButton className="w-full max-w-sm" onClick={props.onCompleteDaily}>Challenge पूरा किया — Bonus XP लें</GoldButton>
        )}
        <p className="text-white/40 text-xs mt-4">रोज़ नया challenge — Streak बनाए रखें!</p>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   BADGES / REWARDS
   ============================================================ */
function BadgesScreen(props) {
  var profile = props.profile;
  var completed = Object.keys(profile.completedChapters).length;
  var earned = badgesFor(completed);
  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="🏆 My Rewards" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3">
          {BADGES.map(function (b) {
            var has = completed >= b.at;
            return (
              <div
                key={b.id}
                className={"rounded-2xl border-2 px-3 py-4 text-center " + (has ? "border-[#F0B90B]/60 bg-[#F0B90B]/10 kk-glow" : "border-white/10 bg-white/[0.03] opacity-50")}
              >
                <div className="text-3xl mb-1">{has ? b.icon : "🔒"}</div>
                <p className="text-white text-[12px] font-bold kk-display">{b.name}</p>
                <p className="text-white/40 text-[10px] mt-1">{b.at} chapters पर unlock</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-white/40 text-xs mt-6">{earned.length}/{BADGES.length} Badges Earned</p>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   CERTIFICATE
   ============================================================ */
function Certificate(props) {
  var profile = props.profile;
  var completed = Object.keys(profile.completedChapters).length;
  var oralPassed = Object.keys(profile.oralStatus).filter(function (id) { return profile.oralStatus[id] === "pass"; }).length;
  var eligible = completed >= 24;

  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="🎓 Certificate" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6">
        {!eligible ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔒</p>
            <p className="text-white kk-display font-bold mb-1">अभी Certificate unlock नहीं हुआ</p>
            <p className="text-white/50 text-sm">सभी 24 Missions पूरे करें ताकि Certificate मिले</p>
            <p className="text-white/70 text-xs mt-3">{completed}/24 Missions पूरे</p>
          </div>
        ) : (
          <div id="kk-certificate" className="mx-auto max-w-md rounded-2xl border-4 px-6 py-8 text-center" style={{ borderColor: "#F0B90B", background: "linear-gradient(180deg, #FFF9EE, #FCE7A8)" }}>
            <p className="text-3xl mb-1">🏆</p>
            <p className="kk-display font-extrabold text-[#4C2A85] text-lg">KINGDOM KIDS</p>
            <p className="kk-display font-bold text-[#7C5CFC] text-sm mb-4">⚔️ JESUS ARMY CERTIFICATE</p>
            <p className="text-[#4C2A85]/70 text-xs mb-2">This certificate is proudly awarded to</p>
            <p className="kk-display font-extrabold text-2xl text-[#241A45] mb-3">{profile.username}</p>
            <p className="text-[#4C2A85]/80 text-xs leading-relaxed mb-4">
              For successfully completing the 24-Chapter Bible Adventure and growing in God's Word.
            </p>
            <p className="text-[#4C2A85] text-[13px] italic mb-4">
              “तेरे वचन को मैं ने अपने हृदय में रख छोड़ा है” — भजन संहिता 119:11
            </p>
            <div className="flex justify-around text-[11px] text-[#4C2A85]/70 border-t border-[#4C2A85]/20 pt-3">
              <span>Chapters: {completed}/24</span>
              <span>Oral Tests: {oralPassed}/24</span>
            </div>
            <p className="text-[#4C2A85]/50 text-[10px] mt-3">{new Date().toLocaleDateString("hi-IN")}</p>
          </div>
        )}
        {eligible && (
          <GoldButton className="w-full mt-5" onClick={function () { window.print(); }}>🖨️ Download / Print Certificate</GoldButton>
        )}
      </div>
    </SkyBg>
  );
}

/* ============================================================
   TEACHER / DIDI PANEL
   ============================================================ */
function TeacherPanel(props) {
  var profile = props.profile;
  var accounts = props.accounts;
  var completed = Object.keys(profile.completedChapters).length;
  var oralPassed = Object.keys(profile.oralStatus).filter(function (id) { return profile.oralStatus[id] === "pass"; }).length;
  var [confirmReset, setConfirmReset] = useState(false);
  var allUsernames = Object.keys(accounts);

  return (
    <SkyBg className="min-h-screen pb-10">
      <TopBar title="👩‍🏫 Didi's Control Panel" onBack={function () { props.onNav("dashboard"); }} />
      <div className="px-5 sm:px-6">
        <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4 mb-4">
          <p className="text-[#FCE7A8] text-[12.5px] font-bold mb-3">वर्तमान Soldier की प्रगति</p>
          <div className="grid grid-cols-2 gap-3 text-white/85 text-[13px]">
            <p>Name: <span className="font-semibold">{profile.username}</span></p>
            <p>Rank: <span className="font-semibold">{rankFor(completed).name}</span></p>
            <p>Chapters: <span className="font-semibold">{completed}/24</span></p>
            <p>Oral Passed: <span className="font-semibold">{oralPassed}/24</span></p>
            <p>XP: <span className="font-semibold">{profile.xp}</span></p>
            <p>Badges: <span className="font-semibold">{badgesFor(completed).length}</span></p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4 mb-4">
          <p className="text-[#FCE7A8] text-[12.5px] font-bold mb-2">Demo / Admin Mode</p>
          <p className="text-white/50 text-[11.5px] mb-3">सभी Chapters को अभी unlock करें ताकि किसी भी क्रम में practice हो सके।</p>
          <button
            onClick={props.onToggleDemo}
            className={"kk-card-btn rounded-xl px-4 py-2 text-xs font-bold border-2 " + (profile.demoMode ? "border-[#2E9E6B] bg-[#2E9E6B]/20 text-white" : "border-white/20 text-white/70")}
          >
            {profile.demoMode ? "✅ Demo Mode ON — सभी unlocked" : "Demo Mode बंद है — Enable करें"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4 mb-4">
          <p className="text-[#FCE7A8] text-[12.5px] font-bold mb-2">Chapter-wise Oral Status</p>
          <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto kk-scroll">
            {CHAPTERS.map(function (ch) {
              var status = profile.oralStatus[ch.id];
              return (
                <div key={ch.id} className="flex items-center justify-between text-[12px] text-white/80 border-b border-white/5 py-1.5">
                  <span>Ch {ch.id}. {ch.name}</span>
                  <span>
                    {status === "pass" ? "✅" : status === "almost" ? "🟡" : status === "practice" ? "🔁" : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {allUsernames.length > 1 && (
          <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4 mb-4">
            <p className="text-[#FCE7A8] text-[12.5px] font-bold mb-3">इस Device पर सभी बच्चों की प्रगति</p>
            <div className="flex flex-col gap-2">
              {allUsernames.map(function (u) {
                var acc = accounts[u];
                var accCompleted = Object.keys(acc.completedChapters || {}).length;
                return (
                  <div key={u} className="flex items-center justify-between text-[12.5px] text-white/80 border-b border-white/5 py-1.5">
                    <span className="font-semibold">{acc.username}</span>
                    <span>{accCompleted}/24 • {rankFor(accCompleted).icon} {rankFor(accCompleted).name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#D6556B]/40 bg-[#D6556B]/10 px-4 py-4">
          <p className="text-white text-[12.5px] font-bold mb-2">⚠️ Reset Progress</p>
          <p className="text-white/60 text-[11px] mb-3">यह इस Soldier की सभी progress मिटा देगा — यह action वापस नहीं होगा।</p>
          {!confirmReset ? (
            <GhostButton onClick={function () { setConfirmReset(true); }}>Progress Reset करें</GhostButton>
          ) : (
            <div className="flex gap-2">
              <button onClick={props.onReset} className="kk-card-btn rounded-xl bg-[#D6556B] px-4 py-2 text-xs font-bold text-white">हाँ, Reset करें</button>
              <GhostButton onClick={function () { setConfirmReset(false); }}>रद्द करें</GhostButton>
            </div>
          )}
        </div>
      </div>
    </SkyBg>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
function App() {
  var [screen, setScreen] = useState("loading");
  var [accounts, setAccounts] = useState({});
  var [activeUsername, setActiveUsername] = useState(null);
  var [pendingUsername, setPendingUsername] = useState(null);
  var [activeChapterId, setActiveChapterId] = useState(null);
  var [loaded, setLoaded] = useState(false);

  useEffect(function () {
    var acc = loadAccounts();
    var active = loadActiveUsername();
    setAccounts(acc);
    if (active && acc[active]) {
      setActiveUsername(active);
      setScreen("dashboard");
    } else {
      setScreen("profiles");
    }
    setLoaded(true);
  }, []);

  function persistAccounts(nextAccounts) {
    setAccounts(nextAccounts);
    saveAccounts(nextAccounts);
  }

  function touchStreak(base) {
    var today = todayStr();
    if (base.lastActive === today) return base;
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    var streak = base.lastActive === yesterday ? base.streak + 1 : 1;
    return Object.assign({}, base, { streak: streak, lastActive: today });
  }

  function updateActiveProfile(updater) {
    if (!activeUsername) return;
    setAccounts(function (prev) {
      var current = prev[activeUsername];
      if (!current) return prev;
      var next = typeof updater === "function" ? updater(current) : Object.assign({}, current, updater);
      var nextAccounts = Object.assign({}, prev, {});
      nextAccounts[activeUsername] = next;
      saveAccounts(nextAccounts);
      return nextAccounts;
    });
  }

  function usernameExists(name) {
    var lower = name.toLowerCase();
    var exists = false;
    Object.keys(accounts).forEach(function (u) {
      if (u.toLowerCase() === lower) exists = true;
    });
    return exists;
  }

  function handleCreateAccount(username, pin, avatarId) {
    var acc = createAccount(username, pin, avatarId);
    var nextAccounts = Object.assign({}, accounts);
    nextAccounts[username] = touchStreak(acc);
    persistAccounts(nextAccounts);
    setActiveUsername(username);
    saveActiveUsername(username);
    setScreen("dashboard");
  }

  function handleSelectProfile(username) {
    setPendingUsername(username);
    setScreen("pin");
  }

  function handlePinSubmit(pin) {
    var acc = accounts[pendingUsername];
    if (!acc || acc.pin !== pin) return false;
    setAccounts(function (prev) {
      var current = prev[pendingUsername];
      var next = touchStreak(current);
      var nextAccounts = Object.assign({}, prev);
      nextAccounts[pendingUsername] = next;
      saveAccounts(nextAccounts);
      return nextAccounts;
    });
    setActiveUsername(pendingUsername);
    saveActiveUsername(pendingUsername);
    setScreen("dashboard");
    return true;
  }

  function handleLogout() {
    setActiveUsername(null);
    saveActiveUsername(null);
    setPendingUsername(null);
    setScreen("profiles");
  }

  function handleOpenChapter(id) {
    setActiveChapterId(id);
    setScreen("chapter");
  }

  function handleCompleteMission(chapterId, correct) {
    updateActiveProfile(function (prev) {
      var already = !!prev.completedChapters[chapterId];
      var xpGain = already ? 0 : (correct ? 100 : 40);
      var nextCompleted = Object.assign({}, prev.completedChapters);
      nextCompleted[chapterId] = true;
      return touchStreak(Object.assign({}, prev, {
        xp: prev.xp + xpGain,
        completedChapters: nextCompleted,
      }));
    });
  }

  function handleMarkOral(chapterId, status) {
    updateActiveProfile(function (prev) {
      var nextOral = Object.assign({}, prev.oralStatus);
      nextOral[chapterId] = status;
      return Object.assign({}, prev, { oralStatus: nextOral });
    });
  }

  function handleAwardFaith(n) {
    updateActiveProfile(function (prev) {
      return Object.assign({}, prev, { faithPoints: prev.faithPoints + n });
    });
  }

  function handleCompleteDaily() {
    var today = todayStr();
    updateActiveProfile(function (prev) {
      var nextDaily = Object.assign({}, prev.dailyDone);
      nextDaily[today] = true;
      return touchStreak(Object.assign({}, prev, {
        xp: prev.xp + 25,
        dailyDone: nextDaily,
      }));
    });
  }

  function handleToggleDemo() {
    updateActiveProfile(function (prev) {
      return Object.assign({}, prev, { demoMode: !prev.demoMode });
    });
  }

  function handleReset() {
    updateActiveProfile(function (prev) {
      var fresh = createAccount(prev.username, prev.pin, prev.avatarId);
      return fresh;
    });
    setScreen("dashboard");
  }

  var activeProfile = activeUsername ? accounts[activeUsername] : null;
  var activeChapter = null;
  for (var i = 0; i < CHAPTERS.length; i++) {
    if (CHAPTERS[i].id === activeChapterId) { activeChapter = CHAPTERS[i]; break; }
  }

  if (screen === "loading" || !loaded) {
    return (
      <div className="kk-root">
        <FontLink />
        <SkyBg className="min-h-screen flex items-center justify-center">
          <p className="text-white/60 text-sm kk-display">लोड हो रहा है...</p>
        </SkyBg>
      </div>
    );
  }

  return (
    <div className="kk-root">
      <FontLink />

      {screen === "profiles" && (
        <ProfilePicker
          accounts={accounts}
          onSelect={handleSelectProfile}
          onAddNew={function () { setScreen("signup"); }}
        />
      )}

      {screen === "signup" && (
        <SignupScreen
          usernameExists={usernameExists}
          onCreate={handleCreateAccount}
          onBack={function () { setScreen("profiles"); }}
        />
      )}

      {screen === "pin" && pendingUsername && (
        <PinEntry
          username={pendingUsername}
          onSubmit={handlePinSubmit}
          onBack={function () { setPendingUsername(null); setScreen("profiles"); }}
        />
      )}

      {screen === "dashboard" && activeProfile && (
        <Dashboard
          profile={activeProfile}
          onNav={setScreen}
          onSwitchProfile={handleLogout}
          onLogout={handleLogout}
        />
      )}

      {screen === "map" && activeProfile && (
        <ChapterMap profile={activeProfile} onNav={setScreen} onOpenChapter={handleOpenChapter} />
      )}

      {screen === "chapter" && activeProfile && activeChapter && (
        <ChapterDetail
          chapter={activeChapter}
          profile={activeProfile}
          onNav={setScreen}
          onCompleteMission={handleCompleteMission}
          onMarkOral={handleMarkOral}
        />
      )}

      {screen === "revision" && activeProfile && (
        <RevisionCamp profile={activeProfile} onNav={setScreen} onOpenChapter={handleOpenChapter} />
      )}

      {screen === "challenge" && activeProfile && (
        <RandomChallenge onNav={setScreen} onAwardFaith={handleAwardFaith} />
      )}

      {screen === "daily" && activeProfile && (
        <DailyChallenge profile={activeProfile} onNav={setScreen} onCompleteDaily={handleCompleteDaily} />
      )}

      {screen === "badges" && activeProfile && (
        <BadgesScreen profile={activeProfile} onNav={setScreen} />
      )}

      {screen === "certificate" && activeProfile && (
        <Certificate profile={activeProfile} onNav={setScreen} />
      )}

      {screen === "teacher" && activeProfile && (
        <TeacherPanel
          profile={activeProfile}
          accounts={accounts}
          onNav={setScreen}
          onToggleDemo={handleToggleDemo}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
