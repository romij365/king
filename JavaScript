const tg = window.Telegram.WebApp;
tg.expand();

// ---------------- DOM ELEMENTS ----------------
const startScreen = document.getElementById("startScreen");
const questionScreen = document.getElementById("questionScreen");
const questionEl = document.getElementById("question");
const opt0 = document.getElementById("opt0");
const opt1 = document.getElementById("opt1");
const opt2 = document.getElementById("opt2");
const opt3 = document.getElementById("opt3");
const timeEl = document.getElementById("time");
const balanceAmount = document.getElementById("balanceAmount");
const withdrawBalance = document.getElementById("withdrawBalance");
const withdrawAmount = document.getElementById("withdrawAmount");
const withdrawMessage = document.getElementById("withdrawMessage");
const refLink = document.getElementById("refLink");
const refMsg = document.getElementById("refMsg");

// ---------------- DATA ----------------
let balance = 0.0;
let current = 0;
let time = 10;
let timer;
let allowClick = true;

// ---------------- QUESTIONS (120) ----------------
const questions = [

/* ========= বাংলাদেশ (৩০) ========= */
{q:"বাংলাদেশের রাজধানী কোনটি?",o:["ঢাকা","চট্টগ্রাম","খুলনা","রাজশাহী"],a:0},
{q:"বাংলাদেশের স্বাধীনতা দিবস কবে?",o:["১৬ ডিসেম্বর","২৬ মার্চ","২১ ফেব্রুয়ারি","১৪ এপ্রিল"],a:1},
{q:"জাতীয় ফুল কোনটি?",o:["গোলাপ","শাপলা","পদ্ম","জুঁই"],a:1},
{q:"জাতীয় ফল কোনটি?",o:["আম","কাঁঠাল","কলা","লিচু"],a:1},
{q:"জাতীয় মাছ কোনটি?",o:["ইলিশ","রুই","কাতলা","চিংড়ি"],a:0},
{q:"বাংলাদেশের মুদ্রার নাম?",o:["রুপি","ডলার","টাকা","দিনার"],a:2},
{q:"জাতীয় কবি কে?",o:["রবীন্দ্রনাথ","নজরুল","জসীমউদ্দীন","সুকান্ত"],a:1},
{q:"২১ ফেব্রুয়ারি কী?",o:["বিজয় দিবস","শহীদ দিবস","স্বাধীনতা দিবস","নববর্ষ"],a:1},
{q:"জাতীয় পতাকার রঙ কয়টি?",o:["১","২","৩","৪"],a:1},
{q:"বাংলাদেশের বৃহত্তম জেলা?",o:["রংপুর","খুলনা","চট্টগ্রাম","রাজশাহী"],a:2},

/* ========= মোবাইল (৩০) ========= */
{q:"অ্যান্ড্রয়েড তৈরি করেছে কে?",o:["Apple","Google","Samsung","Microsoft"],a:1},
{q:"iPhone কোন কোম্পানির?",o:["Samsung","Google","Apple","Nokia"],a:2},
{q:"RAM কী কাজ করে?",o:["স্টোরেজ","গতি বাড়ায়","চার্জ","ডিসপ্লে"],a:1},
{q:"ব্যাটারি ক্ষমতা মাপা হয়?",o:["Volt","Amp","mAh","Watt"],a:2},
{q:"Play Store কোন OS এর?",o:["iOS","Windows","Android","Linux"],a:2},
{q:"ডুয়াল সিম মানে?",o:["২ সিম","২ ব্যাটারি","২ স্ক্রিন","২ ক্যামেরা"],a:0},
{q:"5G কী?",o:["নেটওয়ার্ক","ক্যামেরা","RAM","চার্জার"],a:0},
{q:"ফ্রন্ট ক্যামেরা ব্যবহৃত হয়?",o:["গেম","সেলফি","চার্জ","কল"],a:1},
{q:"ফোন রিস্টার্ট মানে?",o:["বন্ধ","রিসেট","আবার চালু","চার্জ"],a:2},
{q:"টাচ স্ক্রিন কী?",o:["বোতাম","স্পর্শে কাজ","মাউস","কীবোর্ড"],a:1},

/* ========= কম্পিউটার (৩০) ========= */
{q:"CPU এর পূর্ণরূপ?",o:["Central Processing Unit","Control Program Unit","Core Power Unit","Central Program Unit"],a:0},
{q:"কম্পিউটারের মস্তিষ্ক?",o:["RAM","CPU","Monitor","Keyboard"],a:1},
{q:"Keyboard ইনপুট না আউটপুট?",o:["ইনপুট","আউটপুট","দুটো","কোনটাই না"],a:0},
{q:"Mouse কী?",o:["ইনপুট","আউটপুট","স্টোরেজ","CPU"],a:0},
{q:"RAM মানে?",o:["Random Access Memory","Read Access Memory","Run Access Memory","Real Access Memory"],a:0},
{q:"Windows কী?",o:["হার্ডওয়্যার","OS","অ্যাপ","ডিভাইস"],a:1},
{q:"ফাইল সংরক্ষণ হয়?",o:["RAM","CPU","Hard Disk","Monitor"],a:2},
{q:"Internet ব্যবহার হয়?",o:["গেম","ডাটা","বিদ্যুৎ","RAM"],a:1},
{q:"Printer কী?",o:["ইনপুট","আউটপুট","স্টোরেজ","CPU"],a:1},
{q:"USB কী?",o:["ডাটা পোর্ট","চার্জার","OS","ফাইল"],a:0},

/* ========= বিনোদন (৩০) ========= */
{q:"বাংলা নববর্ষ কবে?",o:["১৪ এপ্রিল","২১ ফেব্রুয়ারি","২৬ মার্চ","১৬ ডিসেম্বর"],a:0},
{q:"ক্রিকেটে কয়জন খেলোয়াড়?",o:["৯","১০","১১","১২"],a:2},
{q:"ফুটবল বিশ্বকাপ কত বছর পরপর?",o:["২","৩","৪","৫"],a:2},
{q:"জাতীয় খেলা কোনটি?",o:["ফুটবল","ক্রিকেট","কাবাডি","হকি"],a:2},
{q:"সিনেমা হল কী?",o:["খেলা","বিনোদন","পড়া","চাকরি"],a:1},
{q:"গান শোনা হয়?",o:["চোখে","কানে","নাকে","হাতে"],a:1},
{q:"টিভি কী?",o:["রেডিও","বিনোদন মাধ্যম","ফোন","কম্পিউটার"],a:1},
{q:"কার্টুন কার জন্য?",o:["শিশু","বুড়ো","সবাই","কেউ না"],a:2},
{q:"YouTube কী?",o:["গেম","ভিডিও প্ল্যাটফর্ম","চ্যাট","কল"],a:1},
{q:"খেলা শরীরের জন্য?",o:["খারাপ","ভালো","ক্ষতি","অপ্রয়োজন"],a:1}

];

// ---------------- QUIZ ----------------
function startQuiz(){
  startScreen.classList.remove("active");
  questionScreen.classList.add("active");
  current = 0;
  loadQuestion();
}

function backToStart(){
  clearInterval(timer);
  questionScreen.classList.remove("active");
  startScreen.classList.add("active");
}

function loadQuestion(){
  allowClick = true;
  time = 10;
  timeEl.innerText = time;

  const q = questions[current];
  questionEl.innerText = q.q;

  [opt0,opt1,opt2,opt3].forEach((el,i)=>{
    el.innerText = q.o[i];
    el.className = "option";
  });

  startTimer();
}

function startTimer(){
  clearInterval(timer);
  timer = setInterval(()=>{
    time--;
    timeEl.innerText = time;
    if(time <= 0){
      clearInterval(timer);
      timeUp();
    }
  },1000);
}

function selectOption(i){
  if(!allowClick) return;
  allowClick = false;
  clearInterval(timer);

  const c = questions[current].a;
  [opt0,opt1,opt2,opt3].forEach(o=>o.classList.add("disabled"));

  if(i === c){
    [opt0,opt1,opt2,opt3][i].classList.add("correct");
    balance += 0.1;
    balance = Math.round(balance*100)/100;
    updateBalance();
  }else{
    [opt0,opt1,opt2,opt3][i].classList.add("wrong");
    [opt0,opt1,opt2,opt3][c].classList.add("correct");
  }

  nextQ();
}

function timeUp(){
  if(!allowClick) return;
  allowClick = false;
  const c = questions[current].a;
  [opt0,opt1,opt2,opt3][c].classList.add("correct");
  nextQ();
}

function nextQ(){
  setTimeout(()=>{
    current = (current + 1) % questions.length;
    loadQuestion();
  },1200);
}

// ---------------- BALANCE ----------------
function updateBalance(){
  balanceAmount.innerText = balance + " টাকা";
  withdrawBalance.innerText = balance + " টাকা";
}

// ---------------- WITHDRAW ----------------
function requestWithdraw(){
  const amt = parseFloat(withdrawAmount.value);
  if(amt < 1 || amt > 10){
    withdrawMessage.innerText="১–১০ টাকা দিতে হবে";
    return;
  }
  if(amt > balance){
    withdrawMessage.innerText="ব্যালেন্স পর্যাপ্ত নয়";
    return;
  }
  balance -= amt;
  updateBalance();
  withdrawMessage.innerText="রিকুয়েস্ট পাঠানো হয়েছে ✅";
  withdrawAmount.value = "";
}

// ---------------- MENU ----------------
function openPage(id,el){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".menu-item").forEach(m=>m.classList.remove("active"));
  el.classList.add("active");

  if(id==="refer") setRef();
}

// ---------------- REFER ----------------
const BOT = "quiz_earn_bd_bot";
let uid = tg.initDataUnsafe?.user?.id || localStorage.getItem("uid");
if(!uid){
  uid = Math.floor(100000 + Math.random()*900000);
  localStorage.setItem("uid", uid);
}

function setRef(){
  refLink.value = `https://t.me/${BOT}?start=ref_${uid}`;
}

function copyRef(){
  navigator.clipboard.writeText(refLink.value);
  refMsg.innerText = "রেফার লিংক কপি হয়েছে ✅";
}
