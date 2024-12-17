// 更新时钟
function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 更新日期和时间
    document.getElementById('clock').textContent = 
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// 添加页面切换功能
function showSection(sectionId) {
    // 隐藏所有section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 添加导航点击事件
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // 如果是外部链接，让它正常跳转
        if (href.startsWith('http')) {
            return; // 不阻止默认行为，允许正常跳转
        }
        // 对于内部导航，保持原有行为
        e.preventDefault();
        const sectionId = href.substring(1);
        showSection(sectionId);
    });
});

// 默认显示首页
showSection('home');

// 背景图片切换控制
const backgrounds = document.querySelectorAll('.bg-image');
let currentBg = 0;
const effects = ['effect-blur', 'effect-sharp', 'effect-glass'];
let currentEffect = 0;

function changeBackground() {
    // 先添加新效果，再移除旧效果，避免闪烁
    const nextBg = (currentBg + 1) % backgrounds.length;
    const nextEffect = (currentEffect + 1) % effects.length;
    
    // 准备下一张图片
    backgrounds[nextBg].classList.add(effects[nextEffect]);
    backgrounds[nextBg].classList.add('active');
    
    // 移除当前图片
    setTimeout(() => {
        backgrounds[currentBg].classList.remove('active');
        backgrounds[currentBg].classList.remove(effects[currentEffect]);
        
        currentBg = nextBg;
        currentEffect = nextEffect;
    }, 500); // 从1000ms改为500ms，使过渡更快
}

// 初始化第一张图片
backgrounds[0].classList.add('active');
backgrounds[0].classList.add(effects[0]);

// 每3秒切换一次背景
setInterval(changeBackground, 3000);

// 添加渐变过渡效果
function addTransitionEffect() {
    const activeImg = document.querySelector('.bg-image.active');
    if (activeImg) {
        activeImg.style.transition = 'opacity 1s ease-in-out, filter 1s ease-in-out';
    }
}

// 监听图片加载完成事件
backgrounds.forEach(bg => {
    bg.addEventListener('load', addTransitionEffect);
});

// 添加滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 添加导航栏激活状态
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentHash = window.location.hash || '#home';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.style.opacity = '1';
        } else {
            link.style.opacity = '0.8';
        }
    });
}

// 监听hash变化
window.addEventListener('hashchange', updateActiveNav);
updateActiveNav();

// 添加打字机效果
const typingEffect = {
    text: [
        { pinyin: "LIN", hanzi: "临" },
        { pinyin: "YUAN", hanzi: "渊" },
        { pinyin: "XIAN", hanzi: "羡" },
        { pinyin: "YU", hanzi: "鱼" },
        { pinyin: ",", hanzi: "，" },
        { pinyin: "BU", hanzi: "不" },
        { pinyin: "RU", hanzi: "如" },
        { pinyin: "TUI", hanzi: "退" },
        { pinyin: "ER", hanzi: "而" },
        { pinyin: "JIE", hanzi: "结" },
        { pinyin: "WANG", hanzi: "网" },
        { pinyin: ".", hanzi: "。" }
    ],
    currentIndex: 0,
    currentPinyin: "",
    pinyinIndex: 0,
    
    init() {
        this.pinyinElement = document.querySelector('.signature .pinyin');
        this.hanziElement = document.querySelector('.signature .hanzi');
        this.startTyping();
    },
    
    startTyping() {
        if (this.currentIndex >= this.text.length) {
            setTimeout(() => {
                // 重置并重新开始
                this.currentIndex = 0;
                this.hanziElement.textContent = '';
                this.currentPinyin = '';
                this.pinyinIndex = 0;
                // 重新显示拼音span
                this.pinyinElement.style.display = 'inline-block';
                this.startTyping();
            }, 3000);
            return;
        }

        const currentChar = this.text[this.currentIndex];
        this.typePinyin(currentChar);
    },
    
    typePinyin(char) {
        if (this.pinyinIndex < char.pinyin.length) {
            this.currentPinyin += char.pinyin[this.pinyinIndex];
            this.pinyinElement.textContent = this.currentPinyin;
            this.pinyinIndex++;
            setTimeout(() => this.typePinyin(char), 80);
        } else {
            setTimeout(() => {
                this.pinyinElement.textContent = '';
                this.hanziElement.textContent += char.hanzi;
                this.currentPinyin = '';
                this.pinyinIndex = 0;
                this.currentIndex++;
                
                // 如果是最后一个字，直接隐藏拼音元素
                if (this.currentIndex >= this.text.length) {
                    this.pinyinElement.style.display = 'none';
                }
                
                setTimeout(() => this.startTyping(), 50);
            }, 200);
        }
    }
};

// 启动打字机效果
document.addEventListener('DOMContentLoaded', () => {
    typingEffect.init();
});
  