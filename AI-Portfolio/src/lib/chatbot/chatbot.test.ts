import { queryPortfolioChatbot, MAX_MESSAGE_LENGTH } from "./search-engine";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("Running Chatbot Rule-Based & IR Engine Tests...\n");

// Test 1: Education question (English)
const res1 = queryPortfolioChatbot("Where did you study?");
assert(!res1.isFallback, "Test 1 failed: Should answer education in EN");
assert(res1.answer.includes("University of Phayao"), "Test 1 failed: Missing University of Phayao");
console.log("✓ Test 1: Education (EN) passed");

// Test 2: Education question (Thai)
const res2 = queryPortfolioChatbot("เรียนจบจากที่ไหน");
assert(!res2.isFallback, "Test 2 failed: Should answer education in TH");
assert(res2.answer.includes("มหาวิทยาลัยพะเยา"), "Test 2 failed: Missing มหาวิทยาลัยพะเยา");
console.log("✓ Test 2: Education (TH) passed");

// Test 3: Skills question
const res3 = queryPortfolioChatbot("มีทักษะอะไรบ้าง");
assert(!res3.isFallback, "Test 3 failed: Should answer skills in TH");
assert(res3.answer.includes("Figma"), "Test 3 failed: Missing Figma");
console.log("✓ Test 3: Skills passed");

// Test 4: Contact question with action URL
const res4 = queryPortfolioChatbot("how can I contact you?");
assert(!res4.isFallback, "Test 4 failed: Should answer contact");
assert(res4.answer.includes("nittaya503555@gmail.com"), "Test 4 failed: Missing email");
console.log("✓ Test 4: Contact passed");

// Test 5: Resume download question
const res5 = queryPortfolioChatbot("ขอดาวน์โหลดเรซูเม่");
assert(!res5.isFallback, "Test 5 failed: Should answer resume");
assert(Boolean(res5.actionUrl), "Test 5 failed: Missing actionUrl for resume");
console.log("✓ Test 5: Resume passed");

// Test 6: Out of scope refusal (General knowledge / capital of France)
const res6 = queryPortfolioChatbot("เมืองหลวงของฝรั่งเศสคืออะไร");
assert(res6.isFallback, "Test 6 failed: Out of scope should be fallback");
assert(
  res6.answer === "ขออภัย ฉันตอบได้เฉพาะคำถามเกี่ยวกับข้อมูลในพอร์ตโฟลิโอนี้ เช่น การศึกษา ผลงาน ทักษะ และการติดต่อ",
  "Test 6 failed: Canned refusal mismatch"
);
console.log("✓ Test 6: Out-of-scope refusal (TH) passed");

// Test 7: Out of scope refusal (English)
const res7 = queryPortfolioChatbot("What is the capital of France?");
assert(res7.isFallback, "Test 7 failed: Out of scope should be fallback");
assert(
  res7.answer === "Sorry, I can only answer questions about this portfolio, such as education, projects, skills, and contact details.",
  "Test 7 failed: Canned refusal mismatch (EN)"
);
console.log("✓ Test 7: Out-of-scope refusal (EN) passed");

// Test 8: Fuzzy match / typo tolerance (e.g. "whireframing skils")
const res8 = queryPortfolioChatbot("whireframing skils");
assert(!res8.isFallback, "Test 8 failed: Typo fuzzy matching should work");
console.log("✓ Test 8: Fuzzy match / typo tolerance passed");

// Test 9: Max message length limit
const longMessage = "a".repeat(350);
const res9 = queryPortfolioChatbot(longMessage);
assert(res9.isFallback, "Test 9 failed: Overlength message should be rejected");
assert(res9.answer.includes(String(MAX_MESSAGE_LENGTH)), "Test 9 failed: Should mention limit");
console.log("✓ Test 9: Max length limit passed");

console.log("\nAll 9 Chatbot Tests Passed Successfully!");
