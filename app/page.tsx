'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  HelpCircle,
  CheckCircle,
  XCircle,
  Layers,
  Sparkles,
  Zap,
  Flame,
  Award,
  ChevronDown,
  ArrowRightLeft,
  Settings,
  Tv,
  Smile,
  Target,
  RefreshCw,
  BookOpenCheck,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Compass,
  TrendingUp,
  Dna,
  Binary,
  Plus,
  Trash2,
  ListTodo
} from 'lucide-react';
import { ALL_ACADEMIC_YEARS, SpecializationID } from '../lib/data';

export default function ThanaweyaInteractiveHub() {
  // Navigation Selection States
  const [selectedYearId, setSelectedYearId] = useState<'grade10' | 'grade11' | 'grade12'>('grade12');
  const [selectedSpecId, setSelectedSpecId] = useState<SpecializationID>('scientific_science');
  const [selectedTerm, setSelectedTerm] = useState<1 | 2>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('g12_physics');
  
  // قائمة المهام لتعبئة المواد (Todo List) مع الحفظ التلقائي في المتصفح
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean; category: string }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sharah_todos');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      { id: 't1', text: 'تعبئة مادة الكيمياء الشاملة لأولى ثانوي (الترم الأول والترم الثاني)', completed: true, category: 'الصف الأول الثانوي' },
      { id: 't2', text: 'إدخال مادة الكيمياء وبنية الذرة والجدول الدوري لـ ثانية ثانوي عِلمي', completed: true, category: 'الصف الثاني الثانوي' },
      { id: 't3', text: 'توسيع مادة الكيمياء لثالثة ثانوي (الاتزان وقاعدة لوشاتيليه العجيبة)', completed: true, category: 'الصف الثالث الثانوي' },
      { id: 't4', text: 'تجهيز الأسئلة التفاعلية والتركات والخدع الامتحانية المندلية والكيرشوفية', completed: false, category: 'بنود عامة' },
      { id: 't5', text: 'مراجعة المادة العلمية للتأكد من صياغتها 100% بالعامية المصرية التبسيطية لفرقعة المناهج', completed: true, category: 'بنود عامة' },
      { id: 't6', text: 'تطوير محاكيات المعمل الكيميائي والفيزيائي التفاعلية ومثبتات الـ pH وقانون أوم', completed: true, category: 'المحاكيات' }
    ];
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('بنود عامة');

  const saveTodos = (newTodos: typeof todos) => {
    setTodos(newTodos);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sharah_todos', JSON.stringify(newTodos));
    }
  };

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const item = {
      id: 't_' + Date.now(),
      text: newTodoText.trim(),
      completed: false,
      category: newTodoCategory
    };
    saveTodos([...todos, item]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTodos(updated);
  };

  const deleteTodo = (id: string) => {
    const updated = todos.filter(t => t.id !== id);
    saveTodos(updated);
  };
  
  // Syllabus selection states
  const [selectedUnitIdx, setSelectedUnitIdx] = useState<number>(0);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);
  
  // Interface configuration
  const [activeTab, setActiveTab] = useState<'concept' | 'tool' | 'qna'>('concept');

  // Interactive Tools state storage
  // Physics simulator state (Ohm's Law)
  const [simVolts, setSimVolts] = useState<number>(6);
  const [simOhms, setSimOhms] = useState<number>(5);
  // Organic chemistry builder state
  const [organicCarbons, setOrganicCarbons] = useState<number>(3);
  const [organicBond, setOrganicBond] = useState<'single' | 'double' | 'triple'>('single');
  // Osmosis water level state
  const [osmosisWater, setOsmosisWater] = useState<'low' | 'high'>('high');
  // Derivative slope parameter
  const [slopeX, setSlopeX] = useState<number>(1);
  // Geology simulator parameter
  const [forceType, setForceType] = useState<'tension' | 'compression'>('tension');
  // Grade 10 Momentum simulator state
  const [momentumMass, setMomentumMass] = useState<number>(5);
  const [momentumVelocity, setMomentumVelocity] = useState<number>(4);
  // Grade 10 Celular biological state
  const [mitosisPhase, setMitosisPhase] = useState<'inter' | 'pro' | 'meta' | 'telophase'>('inter');

  // Answers tracker
  const [qAnswers, setQAnswers] = useState<Record<string, number>>({});
  const [revealedQ, setRevealedQ] = useState<Record<string, boolean>>({});

  // Local Gamification States (Simulated progression without complex database)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState<number>(480);

  // Synchronizers and navigation helpers
  const currentYear = ALL_ACADEMIC_YEARS.find(y => y.id === selectedYearId) || ALL_ACADEMIC_YEARS[2];
  
  let currentSpec = currentYear.specializations.find(s => s.id === selectedSpecId);
  if (!currentSpec) {
    currentSpec = currentYear.specializations[0];
  }
  
  const currentSubjects = currentSpec ? currentSpec.subjects : [];
  
  let currentSubject = currentSubjects.find(s => s.id === selectedSubjectId);
  if (!currentSubject && currentSubjects.length > 0) {
    currentSubject = currentSubjects[0];
  }
  
  const currentUnits = currentSubject 
    ? (selectedTerm === 1 ? currentSubject.term1Units : currentSubject.term2Units)
    : [];

  const activeUnit = currentUnits[selectedUnitIdx];
  const activeChapter = activeUnit?.chapters[selectedChapterIdx];
  const activeLesson = activeChapter?.lessons[selectedLessonIdx];

  // Selection Action Triggers
  const selectYear = (yearId: 'grade10' | 'grade11' | 'grade12') => {
    setSelectedYearId(yearId);
    
    let specId: SpecializationID = 'general';
    if (yearId === 'grade11') specId = 'scientific';
    if (yearId === 'grade12') specId = 'scientific_science';
    setSelectedSpecId(specId);
    
    const targetYear = ALL_ACADEMIC_YEARS.find(y => y.id === yearId)!;
    const targetSpec = targetYear.specializations.find(s => s.id === specId) || targetYear.specializations[0];
    const targetSubject = targetSpec.subjects[0];
    
    setSelectedSubjectId(targetSubject?.id || '');
    setSelectedTerm(1);
    setSelectedUnitIdx(0);
    setSelectedChapterIdx(0);
    setSelectedLessonIdx(0);
    setActiveTab('concept');
    setQAnswers({});
    setRevealedQ({});
  };
  
  const selectSpec = (specId: SpecializationID) => {
    setSelectedSpecId(specId);
    
    const targetSpec = currentYear.specializations.find(s => s.id === specId)!;
    const targetSubject = targetSpec.subjects[0];
    
    setSelectedSubjectId(targetSubject?.id || '');
    setSelectedUnitIdx(0);
    setSelectedChapterIdx(0);
    setSelectedLessonIdx(0);
    setActiveTab('concept');
    setQAnswers({});
    setRevealedQ({});
  };

  const selectTerm = (term: 1 | 2) => {
    setSelectedTerm(term);
    setSelectedUnitIdx(0);
    setSelectedChapterIdx(0);
    setSelectedLessonIdx(0);
    setActiveTab('concept');
    setQAnswers({});
    setRevealedQ({});
  };

  const selectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedUnitIdx(0);
    setSelectedChapterIdx(0);
    setSelectedLessonIdx(0);
    setActiveTab('concept');
    setQAnswers({});
    setRevealedQ({});
  };

  const selectLesson = (uIdx: number, cIdx: number, lIdx: number) => {
    setSelectedUnitIdx(uIdx);
    setSelectedChapterIdx(cIdx);
    setSelectedLessonIdx(lIdx);
    setActiveTab('concept');
    setQAnswers({});
    setRevealedQ({});
  };

  const unlockAchievement = (id: string, xpPoints: number) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements(prev => [...prev, id]);
      setTotalXP(prev => prev + xpPoints);
    }
  };

  // Handle Option Click
  const selectOption = (qKey: string, optIndex: number, correctIdx: number) => {
    if (revealedQ[qKey]) return; // already answered
    setQAnswers(prev => ({ ...prev, [qKey]: optIndex }));
    setRevealedQ(prev => ({ ...prev, [qKey]: true }));
    
    if (optIndex === correctIdx) {
      unlockAchievement(`completed_${qKey}`, 60);
    }
  };

  // Calculate Ohm structures
  const currentOhmAmps = parseFloat((simVolts / simOhms).toFixed(2));

  // Determine Organic Nomenclature using pure IUPAC prefix structures
  const getOrganicNomenclature = () => {
    const prefixes = ['ميث', 'إيث', 'بروب', 'بيوت', 'بنت', 'هيكس'];
    const p = prefixes[organicCarbons - 1] || 'كربون';
    if (organicBond === 'single') return `${p}ان (Alkane)`;
    if (organicBond === 'double') return `${p}ين (Alkene)`;
    return `${p}اين (Alkyne)`;
  };

  const getOrganicFormula = () => {
    const c = organicCarbons;
    if (organicBond === 'single') return `C${c}H${2 * c + 2}`;
    if (organicBond === 'double') return `C${c}H${2 * c}`;
    return `C${c}H${2 * c - 2}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200" id="study-hub-v3" dir="rtl">
      
      {/* HEADER BAR FOR SECURE OFFLINE SYSTEM */}
      <header className="sticky top-0 z-40 h-20 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0" id="main-header">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          
          {/* Platform Identity */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-rose-500/20" id="platform-icon">
              <span>مَ</span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black leading-none text-[#F8FAFC]">الشارح التفاعلي المنهجي للثانوية العامة</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-black">100% عامية مصرية</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">المادة العلمية الرسمية مبسطة بالكامل ومصممة بأجمد تشبيهات بلدي ومحاكيات تفاعلية 🇪🇬</p>
            </div>
          </div>

          {/* Gamification widgets */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 shadow-sm">
              <span className="text-orange-500 text-sm animate-pulse">🔥</span>
              <span className="text-[11px] font-extrabold text-slate-200">مذاكر مستمر d7</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/80 rounded-full border border-slate-705 shadow-sm">
              <span className="text-yellow-400 text-sm">🏆</span>
              <span className="text-xs font-mono font-black text-slate-100">{totalXP} XP</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/40 rounded-full border border-blue-800/35">
              <span className="text-xs font-extrabold text-blue-200">مستوى التفوق 5</span>
            </div>
          </div>

        </div>
      </header>

      {/* CORE TIMELINE LEVEL & ACADEMIC YEAR PILOT */}
      <section className="bg-slate-900/80 border-b border-slate-800 py-4 px-4 shadow-md" id="academic-timeline-pills">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Level 1: Year selection switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-black text-slate-400 shrink-0 ml-2">السنة الدراسية:</span>
            {ALL_ACADEMIC_YEARS.map((y) => {
              const isSelected = selectedYearId === y.id;
              return (
                <button
                  key={y.id}
                  onClick={() => selectYear(y.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700/65 hover:bg-slate-750'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{y.name}</span>
                </button>
              );
            })}
          </div>

          {/* Level 2: Track selection and active Term selector */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Specialization Options */}
            <div className="flex items-center gap-1.5 bg-slate-950/40 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 ml-1">التخصص:</span>
              {currentYear.specializations.map((spec) => {
                const isSelected = selectedSpecId === spec.id;
                return (
                  <button
                    key={spec.id}
                    onClick={() => selectSpec(spec.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {spec.name}
                  </button>
                );
              })}
            </div>

            {/* Term Options */}
            <div className="flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => selectTerm(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  selectedTerm === 1
                    ? 'bg-[#1E293B] text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                الترم الأول ❄️
              </button>
              <button
                onClick={() => selectTerm(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  selectedTerm === 2
                    ? 'bg-[#1E293B] text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                الترم الثاني ☀️
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* CORE SUBJECT SELECTOR BAR */}
      <section className="bg-slate-950/30 border-b border-slate-800 py-3 px-4" id="subjects-selector-pills">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-black text-slate-400 shrink-0 ml-2">اختر المادة الدراسية:</span>
          <div className="flex gap-2">
            {currentSubjects.map((sub) => {
              const isActive = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => selectSubject(sub.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-xs font-bold transition-all duration-150 shrink-0 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span className="text-md leading-none">{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6" id="core-hub-grid">
        
        {/* LEFT COLUMN: ACTIVE SYLLABUS DIRECTORY TREE (4 COLS) */}
        <aside className="lg:col-span-4 flex flex-col gap-5" id="syllabus-aside">
          
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl shadow-lg" id="chapters-card">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h2 className="text-xs font-black text-[#F8FAFC] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>فهرس الوحدات والدروس المتاحة</span>
              </h2>
              <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-400">
                منهج رسمي
              </span>
            </div>
            
            {/* If there are no units for this term, show dynamic placeholder under maintenance in Egyptian Arabic */}
            {currentUnits.length === 0 ? (
              <div className="text-center py-12 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                <span className="text-3xl block mb-2">🚧</span>
                <p className="text-xs font-black text-slate-300">عفواً يا بطل!</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed px-4">
                  الباب والترم ده لسة تحت المراجعة اللغوية والتبسيط عشان يطلعلك بأجود جودة تفاعلية. اختار مادة أو ترم تاني وهتلاقي شروحات جاهزة تفرتك الدماغ! ✨
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentUnits.map((unit, uIdx) => (
                  <div key={unit.id} className="space-y-2">
                    {/* Unit Label Header */}
                    <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-850">
                      <span className="text-[10px] font-black text-amber-400 block tracking-wide">
                        {unit.title}
                      </span>
                    </div>

                    {/* Chapters mapped within Unit */}
                    {unit.chapters.map((chap, cIdx) => (
                      <div key={chap.id} className="mr-2 border-r border-slate-800 pr-2 space-y-1.5">
                        <span className="text-[10px] text-slate-500 block font-bold">● {chap.title}</span>
                        
                        {/* Lessons mapped within Chapter */}
                        <div className="space-y-1">
                          {chap.lessons.map((lesson, lIdx) => {
                            const isSelected = selectedUnitIdx === uIdx && selectedChapterIdx === cIdx && selectedLessonIdx === lIdx;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(uIdx, cIdx, lIdx)}
                                className={`w-full text-right p-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-between border ${
                                  isSelected
                                    ? 'bg-blue-600/10 border-blue-500 text-blue-300 font-extrabold'
                                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                                }`}
                              >
                                <span className="truncate max-w-[200px]">{lesson.title}</span>
                                <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gamification Level system card */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 via-[#0F172A] to-indigo-950/40 border border-slate-800" id="study-tip-card">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="w-4.5 h-4.5 text-emerald-400" />
              <h3 className="text-xs font-black text-slate-200">العهد العلمي للشارح بالبلدي 🎓</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-350 font-medium">
              جميع شروحات منصة <strong className="text-emerald-400">الشارح التفاعلي</strong> مبنية بالكامل في محتوى داخلي مستقر وبدون أي استخدام خارجي للذكاء الاصطناعي وقت الاستخدام لتوفير السرعة المطلقة وخلق بيئة دراسية تفرتك المسائل وتضمن لطلاب الثانوية الفهم بنسبة 100%. أدرس واتفوق بأمان!
            </p>
          </div>

          {/* Student Badges earned during custom active session */}
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl shadow-sm" id="badges-locker">
            <h3 className="text-xs font-extrabold text-slate-300 mb-2 border-b border-slate-800/60 pb-1.5">🏆 شاراتك المفتوحة بهذه الجلسة:</h3>
            {unlockedAchievements.length === 0 ? (
              <div className="text-center py-5 bg-slate-950/40 rounded-xl border border-slate-800/40">
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed px-4">ابدأ بتبويب الأسئلة وجاوب صح لفتح شارات المادة والحصول على الـ XP الإضافي!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {unlockedAchievements.map((ach) => (
                  <div key={ach} className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <span className="text-sm">🎖️</span>
                    <span className="text-[9px] font-black text-emerald-300 truncate">جواب صح (+60 XP)</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 text-center">
              <span className="text-[10px] text-amber-400 font-black">شعار المادة الفخري: {currentSubject?.badge || 'سيد المواد 🎓'}</span>
            </div>
          </div>

          {/* INTERACTIVE STUDY PROGRESS TODO LIST */}
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl shadow-lg" id="syllabus-todo-list">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-[#F8FAFC] flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-emerald-400" />
                <span>خطة تعبئة وتغطية المناهج العامة 📝</span>
              </h3>
              <span className="text-[9px] font-black text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {todos.filter(t => t.completed).length}/{todos.length} مكتمل
              </span>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
              تابع تفعيل وحشو جميع المواد، الشعب، والأبواب المنهجية بالتبسيط اللذيذ والأسئلة! يمكنك إضافة مهامك الخاصة لمتابعة مذاكرتك الفولاذية.
            </p>

            {/* Input Form for adding a new task */}
            <div className="space-y-2 mb-4 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتب اسم المهمة أو الدرس هنا..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addTodo();
                  }}
                />
                <button
                  onClick={addTodo}
                  className="bg-blue-600 hover:bg-blue-500 transition-colors p-2 text-white rounded-lg flex items-center justify-center shrink-0"
                  title="إضافة المهمة"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[9px] text-slate-500 font-bold shrink-0">التصنيف:</span>
                <select
                  value={newTodoCategory}
                  onChange={(e) => setNewTodoCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-350 focus:outline-none font-black flex-1 text-left"
                >
                  <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                  <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                  <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                  <option value="المحاكيات">المحاكيات</option>
                  <option value="بنود عامة">بنود عامة</option>
                </select>
              </div>
            </div>

            {/* Tasks list */}
            {todos.length === 0 ? (
              <div className="text-center py-6 bg-slate-950/20 rounded-xl border border-dashed border-slate-850">
                <span className="text-xl block mb-1">🏁</span>
                <span className="text-[10px] font-bold text-slate-500">القائمة فاضية! ضيف لك كام مهمة تفرتكها.</span>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-3 text-right group transition-all duration-150 ${
                      todo.completed
                        ? 'bg-slate-950/20 border-slate-900 text-slate-500 line-through decoration-slate-600'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-3.5 h-3.5 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-colors focus:outline-none ${
                          todo.completed
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'border-slate-600 hover:border-slate-500 bg-slate-950'
                        }`}
                      >
                        {todo.completed && <span className="text-[9px] leading-none">✓</span>}
                      </button>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-medium leading-relaxed block break-words">
                          {todo.text}
                        </span>
                        <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 rounded-full mt-1 ${
                          todo.category === 'الصف الأول الثانوي'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : todo.category === 'الصف الثاني الثانوي'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : todo.category === 'الصف الثالث الثانوي'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {todo.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors opacity-60 group-hover:opacity-100 focus:outline-none shrink-0"
                      title="حذف المهمة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>

        {/* RIGHT COLUMN: ACTIVE STUDY PANEL & LESSON DETAILS SCREEN (8 COLS) */}
        <section className="lg:col-span-8 flex flex-col gap-6" id="lesson-screen">
          
          {/* Main fallback if lesson isn't active */}
          {!activeLesson ? (
            <div className="bg-slate-900/60 border border-slate-800 p-12 text-center rounded-2xl flex flex-col items-center justify-center min-h-[500px]">
              <span className="text-4xl block mb-3">🛠️</span>
              <h3 className="text-sm font-black text-slate-100">تحت الصياغة والتبسيط اللذيذ</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm mt-1.5">
                الفصل أو الدرس المحدد لسا في طور الكتابة والمطابقة مع التعديلات الوزارية الأخيرة لعام 2026. جرب مادة تانية أو فصل تاني وهيبسطك لأبعد حد!
              </p>
            </div>
          ) : (
            <div className="space-y-6 flex flex-col flex-1">
              
              {/* Active Lesson Header metadata */}
              <div className="bg-slate-900/85 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow" id="lesson-header-card">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/15 rounded-full">
                      {currentSubject?.name}
                    </span>
                    <span className="text-[10px] text-slate-650">•</span>
                    <span className="text-[10px] text-slate-400 font-bold">{currentYear.name} - {currentSpec.name}</span>
                  </div>
                  <h2 className="text-lg font-black text-white mt-1.5 flex items-center gap-1.5">
                    <span>{activeLesson.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{activeLesson.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/45 p-1 rounded-xl border border-slate-850">
                  <button
                    onClick={() => {
                      setQAnswers({});
                      setRevealedQ({});
                    }}
                    className="p-1.5 px-3 bg-slate-805 hover:bg-slate-800 text-slate-350 text-[10px] rounded-lg transition-colors border border-slate-750 flex items-center gap-1 font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>تصفير الأسئلة المجاوبة</span>
                  </button>
                </div>
              </div>

              {/* TABS SELECTOR (Concept, Simulators, Questions) */}
              <div className="flex border-b border-slate-800" id="chapter-tabs">
                <button
                  onClick={() => setActiveTab('concept')}
                  className={`flex-1 py-3 text-center text-xs font-black transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'concept'
                      ? 'border-amber-500 text-amber-400 bg-amber-500/5 font-black'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4" />
                  <span>الشرح المتبسط بالعامية</span>
                </button>
                <button
                  onClick={() => setActiveTab('tool')}
                  className={`flex-1 py-3 text-center text-xs font-black transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'tool'
                      ? 'border-amber-500 text-amber-400 bg-amber-500/5 font-black'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>المحاكي / الإنفوجرافيك التفاعلي</span>
                </button>
                <button
                  onClick={() => setActiveTab('qna')}
                  className={`flex-1 py-3 text-center text-xs font-black transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === 'qna'
                      ? 'border-amber-500 text-amber-400 bg-amber-500/5 font-black'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>بنك الأسئلة والخدع الرهيب ({activeLesson.questions.length})</span>
                </button>
              </div>

              {/* CORE STUDY DESK VIEW SCREEN */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl min-h-[480px] p-5 flex flex-col" id="active-tab-panel">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: DETAILED CONCEPT EXPLANATIONS (الشرح العامي المتبسط) */}
                  {activeTab === 'concept' && (
                    <motion.div
                      key="tab-concept"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6 flex-1 text-right"
                    >
                      {/* Egyptian bladi analogy block */}
                      <div className="bg-gradient-to-r from-blue-950/20 to-slate-900/60 p-5 rounded-2xl border-r-4 border-amber-500 border border-slate-800/60 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-amber-400">
                          <span className="text-lg">💡</span>
                          <h4 className="text-xs font-black tracking-wide uppercase">تشبيه بلدي يبسطهالك ويجيب من الآخر:</h4>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                          {activeLesson.analogy}
                        </p>
                      </div>

                      {/* Scientific definition and terminology context */}
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col gap-2">
                        <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block font-mono">التعريف الوزاري والمفهوم العلمي الرسمي بالكتب المدرسية:</span>
                        <p className="text-xs font-bold leading-relaxed text-slate-100">
                          &quot;{activeLesson.coreConcept}&quot;
                        </p>
                      </div>

                      {/* Highly granular multi-paragraph Egyptian colloquial detailed breakdown */}
                      <div className="space-y-5">
                        <h3 className="text-xs font-black text-slate-350 uppercase tracking-widest border-b border-slate-800 pb-2">تفصيل الشرح العميق جداً بأسلوب العامية المصرية العسل:</h3>
                        {activeLesson.deepExplanation.map((para, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-slate-950/30 p-4 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors duration-150"
                          >
                            <p className="text-xs leading-relaxed text-slate-250 whitespace-pre-line font-medium text-justify">
                              {para}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Advisory trap warning warnings */}
                      <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/20 flex flex-col gap-1">
                        <span className="text-[10px] text-rose-450 font-black tracking-wider uppercase flex items-center gap-1">
                          ⚠️ انتبه من تكات وخدع الوزارة السنين الماضية:
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          دلوقتي الامتحانات بتعتمد على الفهم وربط العلاقات وتجربتها عملياً، مش مجرد حفظ أصم خالص! بعد ما قريت الشرح ادخل على التبويب التاني &quot;المحاكي / الإنفوجرافيك التفاعلي&quot; عشان تلعب في قيم العلاقات بنفسك وترسخ المعلومة في دماغك وماتطلعش منها أبداً!
                        </p>
                      </div>

                    </motion.div>
                  )}

                  {/* TAB 2: HARDWARE MULTI-SIMULATOR CONTROLLER */}
                  {activeTab === 'tool' && (
                    <motion.div
                      key="tab-tool"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6 flex-1 text-right flex flex-col"
                    >
                      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 text-lg">⚙️</div>
                        <div>
                          <h4 className="text-xs font-black text-slate-100">{activeLesson.infographicTitle}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">حرك المؤشرات والخيارات لملاحظة تغير العلاقات الفيزيائية والبيولوجية والرياضية التفاعلية فوراً.</p>
                        </div>
                      </div>

                      {/* SIMULATOR RENDERS */}
                      <div className="flex-1 min-h-[350px] bg-slate-950 rounded-2xl border border-slate-800 relative p-6 flex flex-col justify-between overflow-hidden">
                        
                        {/* 1. OHM LAW SIMULATOR */}
                        {activeLesson.infographicType === 'ohm_sim' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="ohm-interactive-workspace">
                            
                            <div className="flex-1 border-2 border-dashed border-slate-805 rounded-xl p-4 flex flex-col items-center justify-center relative bg-slate-900/30">
                              
                              {/* Ammeter widget */}
                              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs font-mono text-emerald-400 flex items-center gap-1.5 shadow-md">
                                <span className="text-[10px] text-slate-500 uppercase">قراءة الأميتر:</span>
                                <span className="font-extrabold">{currentOhmAmps} أمبير</span>
                              </div>

                              {/* Schematic Loop */}
                              <div className="w-56 h-28 border-4 border-blue-500/30 rounded-lg relative flex items-center justify-center">
                                
                                {/* Battery (Voltage) */}
                                <div className="absolute -left-10 top-1/2 -translate-y-1/2 bg-slate-800 border border-slate-700 px-2 py-1 rounded text-[9px] font-bold text-center flex flex-col items-center gap-0.5 shadow-sm">
                                  <span>🔋 البطارية</span>
                                  <span className="text-blue-400 font-mono text-[10px]">{simVolts} فولت</span>
                                </div>

                                {/* Resistor (Resistance) */}
                                <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-orange-950/40 border border-orange-500 rounded px-2 py-1 text-[9px] font-bold text-center flex flex-col items-center gap-0.5 shadow-sm">
                                  <span>⚡ المقاومة R</span>
                                  <span className="text-orange-400 font-mono text-[10px]">{simOhms} أوم</span>
                                </div>

                                {/* Animated flow indicator */}
                                <div className="absolute inset-0">
                                  <div
                                    style={{
                                      animationDuration: `${Math.max(0.5, 4 / (currentOhmAmps || 0.1))}s`
                                    }}
                                    className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-[spin_3s_linear_infinite]"
                                  />
                                </div>
                                
                                <span className="text-[10px] text-slate-500 text-center font-bold">دائرة توصيل متوالية مغلقة</span>

                              </div>

                            </div>

                            {/* Controls */}
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                  <span className="text-blue-300">موتور الدفع - فرق الجهد (V)</span>
                                  <span className="text-blue-400 font-mono">{simVolts} فولت</span>
                                </div>
                                <input
                                  type="range"
                                  min="2"
                                  max="18"
                                  step="1"
                                  value={simVolts}
                                  onChange={(e) => setSimVolts(parseInt(e.target.value))}
                                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                  <span className="text-orange-300">ممانعة السلك - المقاومة (R)</span>
                                  <span className="text-orange-400 font-mono">{simOhms} أوم</span>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="15"
                                  step="1"
                                  value={simOhms}
                                  onChange={(e) => setSimOhms(parseInt(e.target.value))}
                                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                                />
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                ملاحظة الشرح بالبلدي: كل ما <strong className="text-blue-400 font-bold">تزود الجهد (V)</strong> تيار الدفع (I) يزيد، وكل ما <strong className="text-orange-400 font-bold">تزود الأوم المقاوم (R)</strong> التيار ينخنق ويقل علطول!
                              </p>
                            </div>

                          </div>
                        )}

                        {/* 2. KIRCHHOFF JUNCTION SIMULATOR */}
                        {activeLesson.infographicType === 'kirchhoff_sim' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="kirchhoff-interactive-workspace">
                            <div className="flex-1 border-2 border-dashed border-slate-805 rounded-xl p-4 flex flex-col items-center justify-center relative bg-slate-900/30">
                              
                              {/* Node diagram */}
                              <div className="w-64 h-48 relative flex items-center justify-center">
                                
                                {/* Central Node */}
                                <div className="w-9 h-9 rounded-full bg-indigo-650 border-2 border-white flex items-center justify-center font-bold text-xs ring-4 ring-indigo-505/20 z-10 shadow-lg">
                                  A
                                </div>

                                {/* Stream 1 */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-1 bg-emerald-500 flex items-center justify-end">
                                  <span className="absolute -top-4 right-2 text-[10px] text-emerald-400 font-black font-mono">I1 (داخل) = +6 أمبير</span>
                                  <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" style={{ marginRight: '20px' }} />
                                </div>

                                {/* Stream 2 */}
                                <div className="absolute left-0 top-12 w-28 h-1 bg-emerald-500 flex items-center justify-start rotate-[20deg] origin-right">
                                  <span className="absolute -top-4 left-2 text-[10px] text-emerald-400 font-black font-mono">I2 (داخل) = +4 أمبير</span>
                                  <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" style={{ marginLeft: '20px' }} />
                                </div>

                                {/* Stream 3 */}
                                <div className="absolute left-0 bottom-12 w-28 h-1 bg-rose-500 flex items-center justify-start -rotate-[20deg] origin-right">
                                  <span className="absolute -bottom-4 left-2 text-[10px] text-rose-450 font-black font-mono">I3 (خارج) = -10 أمبير</span>
                                  <div className="w-2 h-2 rounded-full bg-rose-300 animate-ping" style={{ marginLeft: '20px' }} />
                                </div>

                              </div>

                              <div className="text-center mt-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                <p className="text-xs font-mono text-indigo-300 font-black">
                                  Σ I (داخل) = 6A + 4A = 10A || Σ I (خارج) = 10A
                                </p>
                                <span className="text-[10px] text-slate-400 block mt-1">
                                  مجموع التيارات الداخلة للنقطة A يساوي تماماً مجموع التيارات الخارجة منها (Σ I = 0)
                                </span>
                              </div>

                            </div>

                            <div className="text-center p-1">
                              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                                بالبلدي: محطة المرور هنا محكمة ومفيش تساهل! مفيش شحنة بتطير في الهوا، كل كولوم بيدخل النقطة لازم يلاقي مخرج ويخرج فوراً ومفيش تخزين الكترونات أبداً!
                              </p>
                            </div>
                          </div>
                        )}

                        {/* 3. CHEMISTRY ORGANIC IUPAC NOMENCLATOR */}
                        {activeLesson.infographicType === 'organic_namer' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="organic-namer-workspace">
                            
                            <div className="flex-1 border-2 border-dashed border-slate-805 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-900/30">
                              
                              {/* Chain visual formula */}
                              <div className="flex items-center gap-1.5 flex-row-reverse mb-6" dir="ltr">
                                {Array.from({ length: organicCarbons }).map((_, index) => (
                                  <React.Fragment key={index}>
                                    {/* Carbon block */}
                                    <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center font-mono font-bold shadow-md">
                                      <span className="text-md text-[#F8FAFC]">C</span>
                                      <span className="text-[9px] text-slate-400">كربونة {index + 1}</span>
                                    </div>
                                    
                                    {/* Bond lines */}
                                    {index < organicCarbons - 1 && (
                                      <div className="w-6 flex flex-col gap-0.5 items-center justify-center">
                                        <div className="w-full h-0.5 bg-blue-500" />
                                        {organicBond !== 'single' && <div className="w-full h-0.5 bg-blue-500" />}
                                        {organicBond === 'triple' && <div className="w-full h-0.5 bg-blue-500" />}
                                      </div>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>

                              {/* Computed Result card */}
                              <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-850 text-center flex flex-col gap-1 shadow-inner">
                                <span className="text-[10px] text-[#10B981] font-black uppercase font-mono tracking-widest">اسم الألكان المطور بالأيوباك IUPAC:</span>
                                <span className="text-lg font-black text-emerald-400">{getOrganicNomenclature()}</span>
                                <span className="text-xs font-mono text-slate-400 mt-1">الصيغة الجزيئية الكيميائية: {getOrganicFormula()}</span>
                              </div>

                            </div>

                            {/* Control panel buttons */}
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="text-[11px] text-slate-450 block mb-1.5 font-black">عدد ذرات الكربون بالسلسلة (n):</span>
                                <div className="flex gap-1.5">
                                  {[2, 3, 4, 5, 6].map((num) => (
                                    <button
                                      key={num}
                                      onClick={() => setOrganicCarbons(num)}
                                      className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-mono font-bold ${
                                        organicCarbons === num
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-800 hover:bg-slate-750 text-slate-350'
                                      }`}
                                    >
                                      {num}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <span className="text-[11px] text-slate-450 block mb-1.5 font-black">نوع الرابطة التساهمية الرئيسية:</span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => setOrganicBond('single')}
                                    className={`flex-1 py-1 px-1 rounded-lg text-[10px] font-bold ${
                                      organicBond === 'single' ? 'bg-emerald-650 text-white' : 'bg-slate-800 text-slate-350'
                                    }`}
                                  >
                                    أحادية (ألكان)
                                  </button>
                                  <button
                                    onClick={() => setOrganicBond('double')}
                                    className={`flex-1 py-1 px-1 rounded-lg text-[10px] font-bold ${
                                      organicBond === 'double' ? 'bg-emerald-650 text-white' : 'bg-slate-800 text-slate-350'
                                    }`}
                                  >
                                    ثنائية (ألكين)
                                  </button>
                                  <button
                                    onClick={() => setOrganicBond('triple')}
                                    className={`flex-1 py-1 px-1 rounded-lg text-[10px] font-bold ${
                                      organicBond === 'triple' ? 'bg-emerald-650 text-white' : 'bg-slate-800 text-slate-350'
                                    }`}
                                  >
                                    ثلاثية (ألكاين)
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        )}

                        {/* 4. BIOLOGY OSMOSIS TURGOR SIMULATOR */}
                        {activeLesson.infographicType === 'osmosis_sim' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="osmosis-workspace">
                            
                            <div className="flex-1 border-2 border-dashed border-slate-805 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-around gap-4 bg-slate-900/30">
                              
                              {/* Irrigation and osmose level selector */}
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-xs text-slate-300 font-black">مستوى ضغط الماء حول الخلايا:</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setOsmosisWater('low')}
                                    className={`py-1.5 px-3.5 rounded-lg text-xs font-black transition-all ${
                                      osmosisWater === 'low'
                                        ? 'bg-rose-500/20 text-rose-450 border border-rose-500/30'
                                        : 'bg-slate-850 text-slate-400'
                                    }`}
                                  >
                                    وسط عالي الملح (جفاف) 🥀
                                  </button>
                                  <button
                                    onClick={() => setOsmosisWater('high')}
                                    className={`py-1.5 px-3.5 rounded-lg text-xs font-black transition-all ${
                                      osmosisWater === 'high'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-slate-850 text-slate-400'
                                    }`}
                                  >
                                    وسط عذب نقي (امتلاء) 💧
                                  </button>
                                </div>
                              </div>

                              {/* Cell Visual representation */}
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-xs text-slate-400">حالة وجدار الخلية النباتية:</span>
                                
                                <div className={`w-32 h-32 rounded-3xl border-4 bg-emerald-900/10 flex items-center justify-center transition-all duration-500 ${
                                  osmosisWater === 'high'
                                    ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.08]'
                                    : 'border-amber-700/60 scale-[0.92] opacity-70'
                                }`}>
                                  
                                  {/* Cell Vacuum Space inside */}
                                  <div className={`rounded-full flex items-center justify-center transition-all duration-500 font-mono text-[9px] font-bold text-center ${
                                    osmosisWater === 'high'
                                      ? 'w-24 h-24 bg-blue-500/20 text-blue-400 border border-blue-500'
                                      : 'w-12 h-12 bg-rose-950/20 text-rose-400 border border-rose-505/35'
                                  }`}>
                                    <div className="p-1">
                                      <span className="block text-[11px]">💧 الفجوة</span>
                                      <span>{osmosisWater === 'high' ? 'ممتلئة 100%' : 'منكمشة كلياً'}</span>
                                    </div>
                                  </div>

                                </div>
                              </div>

                            </div>

                            {/* Explanation outcome */}
                            <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                              <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                                {osmosisWater === 'high' ? (
                                  <span className="text-emerald-400 font-bold">
                                    الدعامة الفسيولوجية مفعلة بالكامل: شربت الفجوة خلايا الماء الاسموزي فتورر الجدار وأصبحت الخلية صلبة وشامخة! ☑️
                                  </span>
                                ) : (
                                  <span className="text-rose-400 font-teal-300 font-bold">
                                    الدعامة الفسيولوجية منتهية: تسرب الماء خارج جدران الخلايا فدبل الجدار وفقدت توترها وذاب امتلائها المائي! ❌
                                  </span>
                                )}
                              </p>
                            </div>

                          </div>
                        )}

                        {/* 5. MATHEMATICS TANGENT SLOPE DERIVATIVE DEVELOPER */}
                        {activeLesson.infographicType === 'derivative_slope' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="derivative-slope-workspace">
                            
                            <div className="flex-1 border-2 border-dashed border-slate-805 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-900/30">
                              
                              <div className="w-56 h-36 bg-slate-950/80 rounded-xl relative border border-slate-850 flex items-center justify-center overflow-hidden">
                                {/* Simple coordinate grid line */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800" />
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800" />
                                
                                {/* Graphic parabola curvature */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-36 h-36 border-b-2 border-r-2 border-l-2 border-amber-500/20 rounded-full absolute -top-8" />
                                </div>

                                {/* Tangent slope */}
                                <div
                                  style={{
                                    transform: `rotate(${-slopeX * 25}deg)`
                                  }}
                                  className="w-48 h-0.5 bg-rose-455 absolute transition-transform duration-300 h-[2px] bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                                />

                                <span className="absolute top-2 right-2 text-[9px] text-[#F8FAFC]/55 font-mono">f(x) = x² || f&apos;(x) = 2x</span>

                              </div>

                              <div className="w-full bg-slate-950 p-2 text-center rounded-lg border border-slate-900/60 mt-4">
                                <p className="text-xs font-black leading-relaxed">
                                  ميل المماس المماسي للدالة <span className="text-amber-400 font-mono">ص = س²</span> عند النقطة س = {slopeX} هو <span className="text-teal-400 font-mono">صَ = {2 * slopeX}</span>
                                </p>
                              </div>

                            </div>

                            {/* X-Slider control */}
                            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                              <div className="flex justify-between text-xs mb-1 font-bold">
                                <span className="text-slate-200">اختر قيمة النقطة س (x-value):</span>
                                <span className="text-amber-400 font-mono">س = {slopeX}</span>
                              </div>
                              <input
                                  type="range"
                                  min="-2"
                                  max="2"
                                  step="1"
                                  value={slopeX}
                                  onChange={(e) => setSlopeX(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                              />
                            </div>

                          </div>
                        )}

                        {/* 6. GEOLOGY FAULTS CRUST SIMULATOR */}
                        {activeLesson.infographicType === 'geology_faults' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="geology-faults-workspace">
                            <div className="flex-1 border-2 border-dashed border-slate-850 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-905/30">
                              
                              {/* Visual tectonic blocks */}
                              <div className="w-72 h-36 relative flex items-center justify-center gap-1.5 overflow-hidden">
                                
                                {/* Static Footwall (حائط سفلي) */}
                                <div className="w-28 h-20 bg-amber-900 border border-amber-800 rounded-lg flex flex-col justify-between p-1 shadow-md">
                                  <div className="h-4 bg-[#1e3a5f]/40 rounded flex items-center justify-center"><span className="text-[8px] font-black">طبقة صخرية علوية</span></div>
                                  <div className="h-4 bg-[#0284c7]/40 rounded flex items-center justify-center"><span className="text-[8px] font-black">طبقة صخرية سفلى</span></div>
                                  <span className="text-[9px] text-amber-400 font-black text-center block">ثابت (حائط سفلي)</span>
                                </div>

                                {/* Slanted fault break line */}
                                <div className="w-1.5 h-24 bg-red-500/70 rotate-12" />

                                {/* Hanging Wall (حائط علوي) representing dynamic slides */}
                                <div
                                  style={{
                                    transform: forceType === 'tension' ? 'translateY(12px)' : 'translateY(-12px)'
                                  }}
                                  className="w-28 h-20 bg-[#653c15] border border-[#8b5a2b] rounded-lg flex flex-col justify-between p-1 transition-transform duration-500 shadow-lg relative"
                                >
                                  <div className="h-4 bg-[#1e3a5f]/45 rounded flex items-center justify-center"><span className="text-[8px] font-black">طبقة صخرية علوية</span></div>
                                  <div className="h-4 bg-[#0284c7]/45 rounded flex items-center justify-center"><span className="text-[8px] font-black">طبقة صخرية سفلى</span></div>
                                  <span className="text-[9px] text-yellow-400 font-black text-center block">متحرك (حائط علوي)</span>
                                </div>

                              </div>

                              <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-850 text-center">
                                <span className="text-[10px] text-amber-400 block font-black uppercase">نوع التصدع المتشكل باعتراض الطبقات:</span>
                                <p className="text-sm font-black text-emerald-400 mt-0.5">
                                  {forceType === 'tension' ? 'فالق عادي (Normal Fault) - ناتج عن شد' : 'فالق معكوس (Reverse Fault) - ناتج عن ضغط'}
                                </p>
                              </div>

                            </div>

                            {/* Tectonic force selection */}
                            <div className="flex gap-2 justify-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                              <button
                                onClick={() => setForceType('tension')}
                                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all ${
                                  forceType === 'tension' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                قوى شد (Tension) ⬅️➡️
                              </button>
                              <button
                                onClick={() => setForceType('compression')}
                                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all ${
                                  forceType === 'compression' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                قوى ضغط (Compression) ➡️⬅️
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 7. GRADE 10 DETAILED MOMENTUM PHYSIC SIMULATOR */}
                        {activeLesson.infographicType === 'momentum_sim' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="momentum-interactive-workspace">
                            <div className="flex-1 border-2 border-dashed border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative bg-slate-900/30">
                              
                              {/* Velocity Track floor and moving vehicle */}
                              <div className="w-full h-32 bg-slate-950 rounded-lg relative overflow-hidden flex items-end pb-2">
                                
                                {/* Track road */}
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-800" />
                                
                                {/* Target Barrier to check push force */}
                                <div className="absolute bottom-2 left-4 w-4.5 h-16 bg-red-650 border border-rose-500 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.4)] flex items-center justify-center">
                                  <span className="text-[8px] font-bold text-white rotate-90">حبل الامتصاص</span>
                                </div>

                                {/* Dynamic mass moving box */}
                                <motion.div
                                  animate={{
                                    x: [280, 25, 280]
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: Math.max(1, 7 - momentumVelocity),
                                    ease: "linear"
                                  }}
                                  style={{
                                    width: `${24 + momentumMass * 3.5}px`,
                                    height: `${14 + momentumMass * 3.5}px`
                                  }}
                                  className="bg-amber-500 border-2 border-amber-400 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.55)] absolute bottom-2 flex items-center justify-center"
                                >
                                  <span className="text-[10px] text-slate-950 font-black">{momentumMass}كجم</span>
                                </motion.div>

                                <span className="absolute top-2 right-4 text-[9px] font-mono text-slate-550">مسار انسيابي لاختبار التصادم</span>
                              </div>

                              {/* Numeric physics results */}
                              <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-850 text-center mt-3 shadow-inner">
                                <span className="text-[10px] text-blue-400 block font-bold">الحسابات الرياضية المباشرة للمعادلة:</span>
                                <p className="text-xs font-black text-emerald-400 mt-1">
                                  كمية التحرك للكتلة (P) = الكتلة ({momentumMass} كجم) × السرعة المماسية ({momentumVelocity} م/ث) = <span className="text-amber-400 font-mono text-sm">{momentumMass * momentumVelocity}</span> كجم.م/ث
                                </p>
                              </div>

                            </div>

                            {/* Sliders config */}
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                  <span className="text-slate-350">وزن وكتلة الجسم المندفع (m):</span>
                                  <span className="text-blue-400 font-mono">{momentumMass} كجم</span>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  step="1"
                                  value={momentumMass}
                                  onChange={(e) => setMomentumMass(parseInt(e.target.value))}
                                  className="w-full accent-blue-500 h-1 bg-slate-800 rounded cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                  <span className="text-slate-350">سرعة اندفاع الجسم (v):</span>
                                  <span className="text-orange-400 font-mono">{momentumVelocity} م/ث</span>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  step="1"
                                  value={momentumVelocity}
                                  onChange={(e) => setMomentumVelocity(parseInt(e.target.value))}
                                  className="w-full accent-orange-500 h-1 bg-slate-800 rounded cursor-pointer"
                                />
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-450 leading-relaxed font-bold">
                              💡 بالبلدي: كل ما <strong className="text-blue-400">تدخن كتلة المقطورة</strong> أو <strong className="text-orange-400">تزود سرعتها الاندفاعية</strong>، كمية تحركها بتبقا فظيعة ويستحيل كبحها فجأة، وده سبب دمار حوادث النقل الثقيل على الطرق الصحراوية السريعة!
                            </p>
                          </div>
                        )}

                        {/* 8. GRADE 10 BIOLOGY MITOSIS CELLULAR SIM */}
                        {activeLesson.infographicType === 'cellular_sim' && (
                          <div className="w-full h-full flex flex-col justify-between gap-6" id="cell-mitosis-workspace">
                            <div className="flex-1 border-2 border-dashed border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-905/30 text-center">
                              
                              <span className="text-[11px] text-slate-400 block mb-2 leading-none font-bold">الشكل الصبغي للكروموسومات داخل النواة:</span>

                              <div className="w-56 h-32 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/45 flex items-center justify-center relative p-3 transition-all duration-300">
                                
                                {/* Interphase (Fuzzy DNA threads) */}
                                {mitosisPhase === 'inter' && (
                                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-400/30 bg-emerald-900/10 flex items-center justify-center relative">
                                    <span className="text-[10px] text-emerald-400/80 font-black">شبكة كروماتينية مفككة</span>
                                  </div>
                                )}

                                {/* Prophase (threads condensed to standard chromo pairs) */}
                                {mitosisPhase === 'pro' && (
                                  <div className="flex gap-2">
                                    <div className="text-lg animate-bounce">❌</div>
                                    <div className="text-lg animate-bounce" style={{ animationDelay: '0.1s' }}>❌</div>
                                  </div>
                                )}

                                {/* Metaphase (Chromo aligns nicely at equator) */}
                                {mitosisPhase === 'meta' && (
                                  <div className="flex flex-col gap-1 items-center">
                                    <div className="absolute right-1/2 translate-x-1/2 w-0.5 top-2 bottom-2 bg-slate-800/60" />
                                    <span className="text-sm z-10">❌</span>
                                    <span className="text-sm z-10">❌</span>
                                  </div>
                                )}

                                {/* Telophase (Cells split) */}
                                {mitosisPhase === 'telophase' && (
                                  <div className="flex gap-6 items-center">
                                    <div className="w-14 h-14 rounded-full border border-emerald-400/40 flex items-center justify-center text-[8px] font-bold text-emerald-300">خلية ناتجة 1</div>
                                    <div className="w-14 h-14 rounded-full border border-emerald-400/40 flex items-center justify-center text-[8px] font-bold text-emerald-300">خلية ناتجة 2</div>
                                  </div>
                                )}

                              </div>

                              {/* State info description written in beautiful Egyptian colloquial */}
                              <div className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-850 mt-3.5">
                                <span className="text-[10px] text-emerald-400 block font-black">البيان المجهري الحالي للطور:</span>
                                <p className="text-xs text-slate-200 mt-1 font-bold leading-relaxed">
                                  {mitosisPhase === 'inter' && 'الخلية في الطور البيني بتجهز نفسها وبتضاعف الحمض النووي قبل الدخول في معمعة الانقسام!'}
                                  {mitosisPhase === 'pro' && 'الطور التمهيدي: بدأت خيوط الكروماتين تتخن وتكثف وتظهر واضحة على شكل الكروموسومات الشهيرة ❌'}
                                  {mitosisPhase === 'meta' && 'الطور الاستوائي: وقفت الكروموسومات صف واحد محترم في خط استواء الخلية استعداداً للانفصال!'}
                                  {mitosisPhase === 'telophase' && 'الطور النهائي: غشاء الخلية ينقسم كلياً لإنتاج خليتين متطابقتين تماماً بطقم صبغي كامل 2n! 🎉'}
                                </p>
                              </div>

                            </div>

                            {/* Phase selectors */}
                            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 grid grid-cols-4 gap-1.5 shadow">
                              <button
                                onClick={() => setMitosisPhase('inter')}
                                className={`py-1 px-1 rounded text-[10px] font-black ${
                                  mitosisPhase === 'inter' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                البيني 🔋
                              </button>
                              <button
                                onClick={() => setMitosisPhase('pro')}
                                className={`py-1 px-1 rounded text-[10px] font-black ${
                                  mitosisPhase === 'pro' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                التمهيدي ✂️
                              </button>
                              <button
                                onClick={() => setMitosisPhase('meta')}
                                className={`py-1 px-1 rounded text-[10px] font-black ${
                                  mitosisPhase === 'meta' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                الاستوائي 📏
                              </button>
                              <button
                                onClick={() => setMitosisPhase('telophase')}
                                className={`py-1 px-1 rounded text-[10px] font-black ${
                                  mitosisPhase === 'telophase' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                النهائي 🎉
                              </button>
                            </div>

                          </div>
                        )}

                      </div>

                    </motion.div>
                  )}

                  {/* TAB 3: TRICK QUESTIONS & SOLUTIONS EXAM BANK */}
                  {activeTab === 'qna' && (
                    <motion.div
                      key="tab-qna"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6 flex-1 text-right"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-950/20 to-slate-905 p-4.5 border border-blue-900/30 rounded-xl flex items-center gap-3">
                        <span className="text-xl">🎯</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-100">بوابة قياس مخرجات الفهم والترويكا:</h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            أسئلة مجمعة بعناية ودقة تماثل نظام التابلت الحديث، مغموسة بشرح تفصيلي عسل بالعامية لضمان تثبيت فخ السؤال وتقفيل الدرجة النهائية!
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {activeLesson.questions.map((q, idx) => {
                          const qKey = `${selectedYearId}_${selectedSubjectId}_${activeLesson.id}_${q.id}`;
                          const chosenIndex = qAnswers[qKey];
                          const isRevealed = revealedQ[qKey];

                          return (
                            <div
                              key={q.id}
                              className="bg-slate-950/30 p-5 rounded-2xl border border-slate-850 hover:border-slate-800 transition-all flex flex-col gap-4 shadow-sm"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="bg-amber-500/20 text-amber-400 font-mono font-black text-[10px] p-2 rounded-lg shrink-0">
                                  س {idx + 1}
                                </span>
                                <h4 className="text-xs font-black text-slate-100 leading-relaxed pt-0.5">
                                  {q.question}
                                </h4>
                              </div>

                              {/* MCQ options stack */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = chosenIndex === oIdx;
                                  const isCorrect = oIdx === q.correctIndex;
                                  
                                  let buttonStyles = 'bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-850';
                                  if (isRevealed) {
                                    if (isCorrect) {
                                      buttonStyles = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-black';
                                    } else if (isSelected) {
                                      buttonStyles = 'bg-rose-500/15 border-rose-500 text-rose-300';
                                    } else {
                                      buttonStyles = 'bg-slate-900/20 border-slate-850 text-slate-500 opacity-55';
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      disabled={isRevealed}
                                      onClick={() => selectOption(qKey, oIdx, q.correctIndex)}
                                      className={`w-full text-right p-3.5 rounded-xl border text-xs transition-all duration-150 flex items-center justify-between ${buttonStyles}`}
                                    >
                                      <span>{opt}</span>
                                      {isRevealed && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mr-1" />}
                                      {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-450 shrink-0 mr-1" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Interactive explanation dropdown after user answers */}
                              {isRevealed && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-2 pt-4 border-t border-slate-800"
                                >
                                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                                    
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-base">💡</span>
                                      <span className="text-xs font-black text-emerald-400">التفسير والشرح بالعامية لضمان بقائها في نفوخك:</span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-slate-200">
                                      {q.explanation}
                                    </p>
                                    
                                    {q.trickWarning && (
                                      <div className="mt-2 p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/20 flex flex-col">
                                        <span className="text-[10px] text-amber-400 font-black flex items-center gap-1">
                                          🚨 فخ وتكَّة الامتحان:
                                        </span>
                                        <p className="text-[10px] text-slate-350 leading-relaxed mt-0.5">
                                          {q.trickWarning}
                                        </p>
                                      </div>
                                    )}

                                  </div>
                                </motion.div>
                              )}

                            </div>
                          );
                        })}
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          )}

        </section>

      </main>

      {/* FIXED PLATFORM FOOTER */}
      <footer className="h-16 bg-slate-950 border-t border-slate-850 flex items-center justify-between px-6 shrink-0 mt-10" id="platform-footer">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-500 tracking-wider font-mono">المنصة التعليمية محدثة ومطابقة لدليل 2026 التفاعلي</span>
          </div>
          <span className="text-[10px] text-slate-400 text-center sm:text-right">
            تمت إعادة صياغة وشرح المادة العلمية بالكامل للعام الدراسي الحالي بأيدي المعلمين الأكاديميين وبأجمد لهجة عامية مصرية لسهولة التحصيل © 2026
          </span>
        </div>
      </footer>

    </div>
  );
}
