import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Shield, AlertCircle, Check, Copy, Terminal, CreditCard, MapPin, Phone, Mail, User, Calendar, Sun, Moon } from 'lucide-react';
import { Identity, GenderFilter, LangCode } from './types';
import { UI_TEXT } from './constants';
import { createNewIdentity } from './utils';
import { CleanIDCard, CleanCreditCard } from './components/Cards';

// --- 高级互动组件与Hooks ---

const Toast = ({ message, show }: { message: string, show: boolean }) => {
  if (!show) return null;
  return (
    <div className="toast-container">
      <div className="toast">
        <Check size={16} />
        <span>{message}</span>
      </div>
    </div>
  );
};

// 乱码字符集
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

// 文字解码特效 Hook
const useScramble = (targetText: string, speed: number = 40, active: boolean = true) => {
  const [display, setDisplay] = useState(targetText);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplay(targetText);
      return;
    }

    // 重置迭代器，开始动画
    setIteration(0);

    let interval: any = null;

    interval = setInterval(() => {
      setIteration(prev => {
        // 也就是当显示的文字长度超过目标时，停止
        if (prev >= targetText.length) {
          clearInterval(interval);
          return prev;
        }

        // 生成乱码: 前面是已确定的，后面是随机的
        const plain = targetText
          .split('')
          .map((char, index) => {
            if (index < prev) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplay(plain);
        return prev + 1 / 2; // 减慢解码速度，每2帧解一个字
      });
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, active, speed]);

  return display;
};

const CyberDataItem = ({
  label,
  value,
  icon: Icon,
  onCopy
}: {
  label: string,
  value: string,
  icon?: any,
  onCopy: (val: string) => void
}) => {
  const [copied, setCopied] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // 启用解码特效
  const scrambledValue = useScramble(value);

  const handleClick = () => {
    onCopy(value); // 复制原始值，不是乱码
    setCopied(true);
    setIsActive(true); // 触发波纹高亮

    setTimeout(() => setIsActive(false), 200); // 高亮短暂闪烁
    setTimeout(() => setCopied(false), 600);
  };

  return (
    <div
      onClick={handleClick}
      className={`data-item group ${copied ? 'copied' : ''} ${isActive ? 'active-ripple' : ''}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={12} className="text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />}
          <span className="label-text">{label}</span>
        </div>
        <Copy size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {/* 使用 font-mono 确保字符等宽，避免乱码跳动导致布局抖动 */}
      <div className="data-value truncate font-mono">{scrambledValue}</div>
    </div>
  );
};



// 光标粒子特效组件
const CursorParticles = ({ theme }: { theme: 'dark' | 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  // Update ref when theme changes to ensure new particles get new color immediately
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 移动时产生粒子 - 减少数量
      for (let i = 0; i < 2; i++) {
        const isLarge = Math.random() > 0.8;
        const isDark = themeRef.current === 'dark';
        const primaryColor = isDark ? '#22D3EE' : '#F97316';
        const secondaryColor = isDark ? '#ffffff' : '#334155';

        particles.current.push({
          x: e.clientX + 8 + (Math.random() - 0.5) * 10,
          y: e.clientY + 8 + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          maxLife: 1,
          size: isLarge ? Math.random() * 8 + 6 : Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
          type: Math.random() > 0.5 ? 'stroke' : 'fill',
          lineWidth: isLarge ? 1.5 : 1
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 Canvas 尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 添加全局光效
      ctx.shadowBlur = 8;
      ctx.shadowColor = themeRef.current === 'dark' ? '#22D3EE' : '#F97316';

      // 更新和绘制粒子
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
        } else {
          // 根据寿命调整透明度
          ctx.globalAlpha = p.life * 0.8;
          ctx.fillStyle = p.color;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.lineWidth || 1;

          if (p.type === 'stroke') {
            ctx.strokeRect(p.x, p.y, p.size, p.size);
          } else {
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

// 点击核心价值观特效组件
const CORE_VALUES_ZH = [
  "富强", "民主", "文明", "和谐",
  "自由", "平等", "公正", "法治",
  "爱国", "敬业", "诚信", "友善"
];
const CORE_VALUES_EN = [
  "Prosperity", "Democracy", "Civility", "Harmony",
  "Freedom", "Equality", "Justice", "Rule of Law",
  "Patriotism", "Dedication", "Integrity", "Friendship"
];

const ClickEffects = ({ lang, theme }: { lang: LangCode, theme: 'dark' | 'light' }) => {
  const [effects, setEffects] = useState<any[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const words = lang === 'zh' ? CORE_VALUES_ZH : CORE_VALUES_EN;
      const text = words[Math.floor(Math.random() * words.length)];

      // Theme-based Colors
      const colors = theme === 'dark' ? [
        '#22D3EE', // Cyan
        '#F472B6', // Pink
        '#A78BFA', // Purple
        '#34D399', // Emerald
      ] : [
        '#F97316', // Orange
        '#EF4444', // Red
        '#EAB308', // Yellow
        '#8B5CF6', // Violet
      ];

      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];

      const newEffect = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        text,
        gradient: `linear-gradient(135deg, ${color1}, ${color2})`
      };

      setEffects(prev => [...prev, newEffect]);

      // Auto cleanup
      setTimeout(() => {
        setEffects(prev => prev.filter(ef => ef.id !== newEffect.id));
      }, 1500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [lang]);

  return (
    <>
      {effects.map(effect => (
        <div
          key={effect.id}
          className="click-text-effect"
          style={{
            left: effect.x,
            top: effect.y,
            backgroundImage: effect.gradient
          }}
        >
          {effect.text}
        </div>
      ))}
    </>
  );
};

export default function App() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('random');
  const [loading, setLoading] = useState(false);
  const [generateCount, setGenerateCount] = useState(0);
  const [lang, setLang] = useState<LangCode>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const t = UI_TEXT[lang];

  // Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const generateIdentity = () => {
    setLoading(true);
    setTimeout(() => {
      const newIdentity = createNewIdentity(genderFilter);
      setIdentity(newIdentity);
      setLoading(false);
      setGenerateCount(c => c + 1);
    }, 400);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(lang === 'en' ? 'COPIED TO CLIPBOARD' : '已复制到剪贴板');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    generateIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-500 font-mono" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin" size={32} />
          <div className="text-sm tracking-widest animate-pulse">INITIALIZING SYSTEM...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <ClickEffects lang={lang} theme={theme} />
      <CursorParticles theme={theme} />
      <Toast message={toastMsg} show={showToast} />

      <div className="cyber-panel w-full max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[600px]">

        {/* === LEFT PANEL (Controls & Assets) === */}
        <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex flex-col gap-8" style={{ backgroundColor: 'var(--bg-panel)' }}>

          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="text-[var(--color-primary)]" size={24} />
              <h1 className="text-xl font-bold tracking-tighter text-white font-mono">
                {lang === 'en' ? 'US_ID_GENERATOR' : '美国身份生成器'}
              </h1>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-[rgba(var(--color-primary-rgb),0.5)] to-transparent"></div>
          </div>

          {/* Cards Display (Visual Assets) */}
          <div className="flex flex-col gap-4 perspective-1000">
            <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              {t.headers.visualAssets}
            </div>
            <div className="flex flex-col gap-4">
              <CleanIDCard identity={identity} animateKey={generateCount} />
              <CleanCreditCard identity={identity} animateKey={generateCount} />
            </div>
          </div>

          {/* Controls */}
          <div className="mt-auto flex flex-col gap-4">

            {/* Options */}
            <div className="flex p-1 bg-white/5 rounded-lg border border-white/5 mb-3">
              <button onClick={() => setTheme('dark')} className={`flex-1 py-2 flex justify-center items-center rounded transition-all ${theme === 'dark' ? 'bg-[rgba(var(--color-primary-rgb),0.5)] text-[var(--color-primary)] shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.2)]' : 'text-slate-500 hover:text-slate-300'}`}><Moon size={16} /></button>
              <button onClick={() => setTheme('light')} className={`flex-1 py-2 flex justify-center items-center rounded transition-all ${theme === 'light' ? 'bg-[rgba(var(--color-primary-rgb),0.5)] text-[var(--color-primary)] shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.2)]' : 'text-slate-500 hover:text-slate-300'}`}><Sun size={16} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex gap-1">
                {/* Lang Toggle */}
                <button onClick={() => setLang('en')} className={`flex-1 py-1 text-[10px] font-bold font-mono rounded border ${lang === 'en' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgba(var(--color-primary-rgb),0.2)]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>EN</button>
                <button onClick={() => setLang('zh')} className={`flex-1 py-1 text-[10px] font-bold font-mono rounded border ${lang === 'zh' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgba(var(--color-primary-rgb),0.2)]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>CN</button>
              </div>

              <div className="flex gap-1">
                {/* Gender Toggle - Simplified for space */}
                {(['random', 'male', 'female'] as GenderFilter[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`flex-1 py-1 text-[10px] font-bold font-mono rounded capitalize border ${genderFilter === g
                      ? 'border-[var(--color-emerald)] text-[var(--color-emerald)] bg-[rgba(var(--color-emerald-rgb),0.2)]'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {g[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateIdentity}
              disabled={loading}
              className="glitch-btn w-full py-4 flex items-center justify-center gap-3 relative group"
            >
              {loading && <RefreshCw size={18} className="animate-spin" />}
              <span>{t.generate}</span>
            </button>

          </div>
        </div>

        {/* === RIGHT PANEL (Data Grid) === */}
        <div className="flex-1 p-6 md:p-10 relative flex flex-col">

          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 flex-1 md:auto-rows-fr">

            {/* Group 1: Personal Data */}
            <div className="p-4 rounded-xl border bg-[color:rgba(var(--color-primary-rgb),0.05)] border-[color:rgba(var(--color-primary-rgb),0.2)] hover:border-[color:rgba(var(--color-primary-rgb),0.4)] transition-colors flex flex-col">
              <h3 className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] border-b border-[color:rgba(var(--color-primary-rgb),0.2)] pb-2 mb-3">
                <User size={14} />
                <span>{t.headers.personal}</span>
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                <CyberDataItem icon={User} label={t.labels.fullName} value={identity.fullName} onCopy={handleCopy} />
                <CyberDataItem icon={User} label={t.labels.gender} value={lang === 'en' ? identity.gender.toUpperCase() : (identity.gender === 'male' ? '男' : '女')} onCopy={handleCopy} />
                <CyberDataItem icon={Calendar} label={t.labels.birthDate} value={identity.birthday} onCopy={handleCopy} />
              </div>
            </div>

            {/* Group 2: Contact Info */}
            <div className="p-4 rounded-xl border bg-[color:rgba(var(--color-emerald-rgb),0.05)] border-[color:rgba(var(--color-emerald-rgb),0.2)] hover:border-[color:rgba(var(--color-emerald-rgb),0.4)] transition-colors flex flex-col">
              <h3 className="flex items-center gap-2 text-xs font-mono text-[var(--color-emerald)] border-b border-[color:rgba(var(--color-emerald-rgb),0.2)] pb-2 mb-3">
                <Phone size={14} />
                <span>{t.headers.contact}</span>
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                <CyberDataItem icon={Phone} label={t.labels.phone} value={identity.phone} onCopy={handleCopy} />
                <CyberDataItem icon={Mail} label={t.labels.email} value={identity.email} onCopy={handleCopy} />
              </div>
            </div>

            {/* Group 3: Location Data */}
            <div className="p-4 rounded-xl border bg-[color:rgba(var(--color-emerald-rgb),0.05)] border-[color:rgba(var(--color-emerald-rgb),0.2)] hover:border-[color:rgba(var(--color-emerald-rgb),0.4)] transition-colors md:col-span-2 lg:col-span-1 flex flex-col">
              <h3 className="flex items-center gap-2 text-xs font-mono text-[var(--color-emerald)] border-b border-[color:rgba(var(--color-emerald-rgb),0.2)] pb-2 mb-3">
                <MapPin size={14} />
                <span>{t.headers.location}</span>
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                <CyberDataItem icon={MapPin} label={t.labels.addressLine1} value={identity.address.street} onCopy={handleCopy} />
                <div className="grid grid-cols-2 gap-2">
                  <CyberDataItem label={t.labels.city} value={identity.address.city} onCopy={handleCopy} />
                  <CyberDataItem label={t.labels.state} value={identity.address.stateAbbr} onCopy={handleCopy} />
                </div>
                <CyberDataItem label={t.labels.zipCode} value={identity.address.zip} onCopy={handleCopy} />
              </div>
            </div>

            {/* Group 4: Financial Records */}
            <div className="p-4 rounded-xl border bg-[color:rgba(var(--color-purple-rgb),0.05)] border-[color:rgba(var(--color-purple-rgb),0.2)] hover:border-[color:rgba(var(--color-purple-rgb),0.4)] transition-colors md:col-span-2 lg:col-span-1 flex flex-col">
              <h3 className="flex items-center gap-2 text-xs font-mono text-[var(--color-purple)] border-b border-[color:rgba(var(--color-purple-rgb),0.2)] pb-2 mb-3">
                <CreditCard size={14} />
                <span>{t.headers.financial}</span>
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                <CyberDataItem icon={CreditCard} label={t.labels.cardNumber} value={identity.creditCard.number} onCopy={handleCopy} />
                <div className="grid grid-cols-2 gap-2">
                  <CyberDataItem icon={Calendar} label={t.labels.cardExpiry} value={identity.creditCard.exp} onCopy={handleCopy} />
                  <CyberDataItem icon={Shield} label={t.labels.cvv} value={identity.creditCard.cvv} onCopy={handleCopy} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
