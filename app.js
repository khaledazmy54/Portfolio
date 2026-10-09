/* ============================================================
   Khaled Azmy — Data Science & AI Portfolio
   app.js — React Application
   ============================================================
   
   REQUIREMENTS:
   - React 18 (loaded via CDN in index.html)
   - ReactDOM 18 (loaded via CDN in index.html)
   - Babel Standalone (compiles this JSX in the browser)
   - Lucide Icons (loaded via CDN)
   - An internet connection is required to load CDN dependencies.
   
   ARCHITECTURE:
   - All content data is centralized at the top in JS objects/arrays.
   - Components are self-contained and reusable.
   - IntersectionObserver handles scroll-triggered animations.
   - Contact form uses mailto: (no backend required).
   ============================================================ */

const { useState, useEffect, useRef, useCallback } = React;

/* ── CENTRALIZED DATA ─────────────────────────────────────── */

const PROFILE = {
    name: "Khaled Azmy",
    initials: "KA",
    role: "Data Science & AI Student",
    headline: "Turning Data Into Insights. Building Solutions With AI.",
    description: "I'm Khaled Azmy, a Data Science & AI student passionate about exploring data, building predictive models, and developing practical solutions through code.",
    tagline: "Explore. Analyze. Build. Improve.",
    photo: "0.png",
    github: "https://github.com/khaledazmy54",
    linkedin: "https://www.linkedin.com/in/khaled-azmy-data/",
    email: "khaledazmy54@gmail.com",
    phone: "01097180717",
    location: "Egypt"
};

const ABOUT = {
    paragraphs: [
        "I'm a second-year Data Science & AI student at Horus University, Faculty of Artificial Intelligence. I'm building my foundation through hands-on projects that span the full data workflow — from raw data exploration and cleaning to feature engineering, model training, and evaluation.",
        "My approach centers on understanding the problem before jumping to solutions. I believe that careful data exploration and thoughtful preprocessing are just as important as choosing the right algorithm. Every project I build teaches me something new about how data can drive better decisions.",
        "I work primarily with Python and its data ecosystem — Pandas for manipulation, Scikit-Learn for modeling, and Jupyter/Colab for experimentation. I'm continuously expanding my skills through coursework, self-study, and building projects that solve real-world problems."
    ],
    highlight: "I focus on understanding the problem and the data before choosing a solution.",
    attributes: [
        { icon: "brain", text: "Analytical Thinker" },
        { icon: "target", text: "Problem Solver" },
        { icon: "trending-up", text: "Continuous Learner" },
        { icon: "lightbulb", text: "Curious Explorer" },
        { icon: "code", text: "Code-Driven Approach" },
        { icon: "users", text: "Team Collaborator" }
    ]
};

const EDUCATION = {
    institution: "Horus University",
    faculty: "Faculty of Artificial Intelligence",
    department: "Data Science & AI",
    year: "2nd Year Student",
    gpa: "3.01 / 4.00",
    status: "Currently Enrolled"
};

const SKILLS = [
    {
        category: "Programming",
        icon: "code-2",
        items: [
            { name: "Python", icon: "code" },
            { name: "C++", icon: "terminal" }
        ]
    },
    {
        category: "Data & Databases",
        icon: "database",
        items: [
            { name: "Excel", icon: "table" },
            { name: "SQL", icon: "database" },
            { name: "Pandas", icon: "file-spreadsheet" }
        ]
    },
    {
        category: "Machine Learning",
        icon: "cpu",
        items: [
            { name: "Supervised Learning", icon: "brain" },
            { name: "Classification", icon: "layers" },
            { name: "Regression", icon: "trending-up" },
            { name: "Model Evaluation", icon: "check-circle" }
        ]
    },
    {
        category: "Data Science",
        icon: "bar-chart-3",
        items: [
            { name: "Data Preprocessing", icon: "filter" },
            { name: "Feature Engineering", icon: "sliders" },
            { name: "TF-IDF", icon: "file-text" },
            { name: "Exploratory Data Analysis", icon: "search" }
        ]
    },
    {
        category: "Development Tools",
        icon: "terminal",
        items: [
            { name: "Jupyter Notebook", icon: "book-open" },
            { name: "Google Colab", icon: "cloud" },
            { name: "Git / GitHub", icon: "git-branch" }
        ]
    }
];

const EXPERIENCE = [
    {
        title: "AI & Machine Learning Diploma",
        organization: "Route Academy",
        description: "Completed a comprehensive diploma program covering artificial intelligence and machine learning fundamentals, algorithms, and practical applications.",
        type: "diploma"
    },
    {
        title: "Data Science & AI Track",
        organization: "Digital Egypt Pioneers Initiative (DEPI)",
        description: "Participated in the national DEPI initiative by the Egyptian Ministry of Communications & Information Technology, focused on data science, AI foundations, and hands-on software engineering practices.",
        type: "training"
    }
];

const SERVICES = [
    {
        icon: "search",
        title: "Exploratory Data Analysis",
        description: "Investigate datasets to uncover patterns, distributions, and relationships that inform better decisions and modeling strategies."
    },
    {
        icon: "filter",
        title: "Data Cleaning & Preprocessing",
        description: "Transform raw, messy data into clean, structured formats ready for analysis — handling missing values, outliers, and inconsistencies."
    },
    {
        icon: "bar-chart-2",
        title: "Data Visualization",
        description: "Create clear, informative charts and visual summaries that communicate data findings effectively to technical and non-technical audiences."
    },
    {
        icon: "brain",
        title: "ML Model Development",
        description: "Build and evaluate supervised learning models for classification and regression tasks, from feature engineering to performance assessment."
    },
    {
        icon: "file-text",
        title: "Data Preparation & Reporting",
        description: "Structure raw data into analysis-ready formats and produce clear summary reports with actionable insights."
    }
];

const PROJECTS = {
    featured: {
        title: "House Price Prediction",
        slug: "house-price-prediction",
        badge: "Featured Project — End-to-End ML Pipeline",
        description: "An end-to-end regression application that trains a house-price model, serves predictions via FastAPI, and presents estimates and metrics in an interactive Streamlit dashboard.",
        repo: "https://github.com/khaledazmy54/House-Price-prediction",
        technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "FastAPI", "Streamlit", "Docker", "Joblib"],
        details: [
            {
                title: "Problem Statement",
                icon: "target",
                content: "Accurately predicting residential property prices by modeling feature interactions such as overall quality, living area, neighborhood, year built, and garage capacity."
            },
            {
                title: "Data Pipeline",
                icon: "filter",
                items: [
                    "IQR-based outlier filtering on GrLivArea",
                    "Missing value imputation",
                    "ColumnTransformer with standard scaling",
                    "One-Hot Encoding for categorical features"
                ]
            },
            {
                title: "Model & Training",
                icon: "cpu",
                items: [
                    "Random Forest Regressor",
                    "Hyperparameter tuning",
                    "Train/validation split evaluation",
                    "Model artifact serialization (Joblib)"
                ]
            },
            {
                title: "Deployment",
                icon: "server",
                items: [
                    "FastAPI REST API (/predict endpoint)",
                    "Streamlit interactive dashboard",
                    "Docker / Docker Compose containerization",
                    "Separate model & transformer artifacts"
                ]
            }
        ]
    },
    secondary: [
        {
            title: "Twitter Sentiment Analysis",
            description: "A supervised ML solution for sentiment classification of ~32,000 tweets. Applied text preprocessing, TF-IDF feature extraction, and compared Logistic Regression, Random Forest, and Linear SVM models.",
            technologies: ["Python", "Scikit-Learn", "Pandas", "TF-IDF", "NLP"],
            repo: "https://github.com/khaledazmy54"
        },
        {
            title: "Restaurant Management System",
            description: "A C++ application for organizing and managing restaurant-related information using data structures, algorithms, functions, and structured data management concepts.",
            technologies: ["C++", "Data Structures", "Algorithms"],
            repo: "https://github.com/khaledazmy54"
        }
    ]
};

const LANGUAGES = [
    { language: "Arabic", level: "Native" },
    { language: "English", level: "Good" }
];

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
];

/* ── ROBUST ICON HELPER ───────────────────────────────────── */

function toPascalCase(str) {
    if (!str) return "";
    return str
        .split(/[-_ ]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join("");
}

function LucideIcon({ name, size = 20, className = "" }) {
    const ref = useRef(null);

    // Official Crisp Brand Icons
    if (name === "github") {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
                style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
            >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
        );
    }

    if (name === "linkedin") {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
                style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
            >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        );
    }

    useEffect(() => {
        let timer;
        const renderIcon = () => {
            if (!ref.current) return false;
            const pascal = toPascalCase(name);
            const iconData = window.lucide?.icons?.[pascal];

            if (iconData && window.lucide?.createElement) {
                try {
                    const svgEl = window.lucide.createElement(iconData, {
                        width: size,
                        height: size,
                        stroke: "currentColor",
                        "stroke-width": 2,
                        ...(className ? { class: className } : {})
                    });
                    ref.current.innerHTML = "";
                    ref.current.appendChild(svgEl);
                    return true;
                } catch (e) {
                    console.warn("Lucide render error for", name, e);
                }
            }
            return false;
        };

        if (!renderIcon()) {
            // Retry briefly if Lucide CDN bundle is still finishing load
            timer = setInterval(() => {
                if (renderIcon()) clearInterval(timer);
            }, 80);
            const cancelTimeout = setTimeout(() => clearInterval(timer), 3000);
            return () => {
                clearInterval(timer);
                clearTimeout(cancelTimeout);
            };
        }
    }, [name, size, className]);

    return (
        <span
            ref={ref}
            className={className}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: size,
                height: size,
                lineHeight: 1,
                flexShrink: 0
            }}
        />
    );
}

/* ── INTERSECTION OBSERVER HOOK ───────────────────────────── */

function useScrollAnimation() {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            element.classList.add("visible");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* ── NAVBAR COMPONENT ─────────────────────────────────────── */

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection("#" + entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-70px 0px -50% 0px" }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
            <div className="container">
                <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    <span className="nav-logo-icon">{PROFILE.initials}</span>
                    <span className="nav-logo-text">{PROFILE.name.split(" ")[0]}<span className="nav-logo-dot">.</span></span>
                </a>

                <div className="nav-links">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${activeSection === link.href ? "active" : ""}`}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href={PROFILE.github} className="nav-cta" target="_blank" rel="noopener noreferrer">
                        <LucideIcon name="github" size={16} />
                        GitHub
                    </a>
                </div>

                <button
                    className={`nav-toggle ${mobileOpen ? "active" : ""}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    <span></span><span></span><span></span>
                </button>
            </div>

            <div className={`nav-mobile ${mobileOpen ? "open" : ""}`} role="dialog" aria-label="Mobile navigation">
                {NAV_LINKS.map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="nav-link"
                        onClick={(e) => handleNavClick(e, link.href)}
                    >
                        {link.label}
                    </a>
                ))}
                <a href={PROFILE.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                    <LucideIcon name="github" size={16} />
                    GitHub Profile
                </a>
            </div>
        </nav>
    );
}

/* ── HERO COMPONENT ───────────────────────────────────────── */

function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        Available for Internships & Collaborations
                    </div>

                    <h1 className="hero-name">
                        {PROFILE.name.split(" ")[0]}{" "}
                        <span className="hero-name-accent">{PROFILE.name.split(" ").slice(1).join(" ")}</span>
                    </h1>

                    <p className="hero-headline">{PROFILE.headline}</p>
                    <p className="hero-description">{PROFILE.description}</p>
                    <p className="hero-tagline">{PROFILE.tagline}</p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                            <LucideIcon name="folder-open" size={16} />
                            View Projects
                        </a>
                        <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                            <LucideIcon name="mail" size={16} />
                            Contact Me
                        </a>
                        <a href={PROFILE.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                            <LucideIcon name="github" size={16} />
                            GitHub
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-portrait-wrapper">
                        <div className="hero-portrait-ring"></div>
                        <img
                            src={PROFILE.photo}
                            alt={`Portrait of ${PROFILE.name}`}
                            className="hero-portrait"
                            loading="eager"
                        />
                        <div className="hero-data-nodes">
                            <div className="data-node" title="Database & SQL">
                                <LucideIcon name="database" size={18} />
                            </div>
                            <div className="data-node" title="Machine Learning & AI">
                                <LucideIcon name="cpu" size={18} />
                            </div>
                            <div className="data-node" title="Data Analytics & Metrics">
                                <LucideIcon name="bar-chart-3" size={18} />
                            </div>
                            <div className="data-node" title="Python & Algorithms">
                                <LucideIcon name="code-2" size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator" aria-hidden="true">
                <span>scroll</span>
                <div className="scroll-indicator-line"></div>
            </div>
        </section>
    );
}

/* ── ABOUT COMPONENT ──────────────────────────────────────── */

function About() {
    const ref = useScrollAnimation();
    return (
        <section className="section" id="about">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="user" size={14} />
                        Get to Know Me
                    </span>
                    <h2 className="section-title">A Little About Me</h2>
                </div>
                <div className="about-grid">
                    <AboutText />
                    <AboutAttributes />
                </div>
            </div>
        </section>
    );
}

function AboutText() {
    const ref = useScrollAnimation();
    return (
        <div className="about-text animate-on-scroll" ref={ref}>
            {ABOUT.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <blockquote className="about-highlight">
                "{ABOUT.highlight}"
            </blockquote>
        </div>
    );
}

function AboutAttributes() {
    const ref = useScrollAnimation();
    return (
        <div className="about-attributes animate-on-scroll" ref={ref}>
            {ABOUT.attributes.map((attr, i) => (
                <div className={`about-attr animate-delay-${(i % 4) + 1}`} key={i}>
                    <span className="about-attr-icon">
                        <LucideIcon name={attr.icon} size={18} />
                    </span>
                    <span className="about-attr-text">{attr.text}</span>
                </div>
            ))}
        </div>
    );
}

/* ── EDUCATION COMPONENT ──────────────────────────────────── */

function Education() {
    const ref = useScrollAnimation();
    const ref2 = useScrollAnimation();
    return (
        <section className="section" id="education">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="graduation-cap" size={14} />
                        Academic Background
                    </span>
                    <h2 className="section-title">Education</h2>
                </div>
                <div className="education-card card animate-on-scroll" ref={ref2}>
                    <div className="edu-header">
                        <div className="edu-icon-wrapper">
                            <LucideIcon name="graduation-cap" size={26} />
                        </div>
                        <div>
                            <h3 className="edu-title">{EDUCATION.department}</h3>
                            <p className="edu-institution">{EDUCATION.institution} — {EDUCATION.faculty}</p>
                        </div>
                    </div>
                    <div className="edu-details">
                        <div className="edu-detail">
                            <div className="edu-detail-icon-wrap">
                                <LucideIcon name="calendar" size={18} />
                            </div>
                            <div>
                                <span className="edu-detail-label">Year</span>
                                <span className="edu-detail-value">{EDUCATION.year}</span>
                            </div>
                        </div>
                        <div className="edu-detail">
                            <div className="edu-detail-icon-wrap">
                                <LucideIcon name="award" size={18} />
                            </div>
                            <div>
                                <span className="edu-detail-label">GPA</span>
                                <span className="edu-detail-value">{EDUCATION.gpa}</span>
                            </div>
                        </div>
                        <div className="edu-detail">
                            <div className="edu-detail-icon-wrap">
                                <LucideIcon name="check-circle" size={18} />
                            </div>
                            <div>
                                <span className="edu-detail-label">Status</span>
                                <span className="edu-detail-value">{EDUCATION.status}</span>
                            </div>
                        </div>
                        <div className="edu-detail">
                            <div className="edu-detail-icon-wrap">
                                <LucideIcon name="book-open" size={18} />
                            </div>
                            <div>
                                <span className="edu-detail-label">Field</span>
                                <span className="edu-detail-value">{EDUCATION.department}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── SKILLS COMPONENT ─────────────────────────────────────── */

function Skills() {
    const ref = useScrollAnimation();
    return (
        <section className="section" id="skills">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="wrench" size={14} />
                        Technical Toolkit
                    </span>
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="section-subtitle">
                        Technologies and concepts I work with through coursework and personal projects.
                    </p>
                </div>
                <div className="skills-grid">
                    {SKILLS.map((group, i) => (
                        <SkillGroup key={group.category} group={group} delay={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillGroup({ group, delay }) {
    const ref = useScrollAnimation();
    return (
        <div className={`skill-group card animate-on-scroll animate-delay-${(delay % 4) + 1}`} ref={ref}>
            <div className="skill-group-header">
                <div className="skill-group-icon">
                    <LucideIcon name={group.icon} size={20} />
                </div>
                <h3 className="skill-group-title">{group.category}</h3>
            </div>
            <div className="skill-chips">
                {group.items.map((skill) => {
                    const name = typeof skill === "string" ? skill : skill.name;
                    const icon = typeof skill === "string" ? "check" : skill.icon;
                    return (
                        <span className="skill-chip" key={name}>
                            <LucideIcon name={icon} size={14} className="skill-chip-icon" />
                            <span>{name}</span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

/* ── EXPERIENCE COMPONENT ─────────────────────────────────── */

function Experience() {
    const ref = useScrollAnimation();
    if (EXPERIENCE.length === 0) return null;
    return (
        <section className="section" id="experience">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="briefcase" size={14} />
                        Learning Journey
                    </span>
                    <h2 className="section-title">Training & Development</h2>
                    <p className="section-subtitle">
                        Programs and initiatives that have shaped my technical foundation.
                    </p>
                </div>
                <div className="timeline">
                    {EXPERIENCE.map((item, i) => (
                        <TimelineItem key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }) {
    const ref = useScrollAnimation();
    const iconName = item.type === "diploma" ? "award" : "sparkles";
    return (
        <div className={`timeline-item animate-on-scroll animate-delay-${(index % 4) + 1}`} ref={ref}>
            <div className="timeline-dot"></div>
            <div className="timeline-content card">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <div style={{ color: "var(--accent)", display: "flex", alignItems: "center" }}>
                        <LucideIcon name={iconName} size={18} />
                    </div>
                    <h3 className="timeline-title" style={{ margin: 0 }}>{item.title}</h3>
                </div>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-desc">{item.description}</p>
            </div>
        </div>
    );
}

/* ── SERVICES COMPONENT ───────────────────────────────────── */

function Services() {
    const ref = useScrollAnimation();
    return (
        <section className="section" id="services">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="zap" size={14} />
                        How I Can Help
                    </span>
                    <h2 className="section-title">Areas I Can Help With</h2>
                    <p className="section-subtitle">
                        Practical data skills I'm developing and applying through coursework and real projects.
                    </p>
                </div>
                <div className="services-grid">
                    {SERVICES.map((service, i) => (
                        <ServiceCard key={i} service={service} delay={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, delay }) {
    const ref = useScrollAnimation();
    return (
        <div className={`service-card card animate-on-scroll animate-delay-${(delay % 4) + 1}`} ref={ref}>
            <div className="service-icon">
                <LucideIcon name={service.icon} size={24} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
        </div>
    );
}

/* ── PROJECTS COMPONENT ───────────────────────────────────── */

function Projects() {
    const ref = useScrollAnimation();
    return (
        <section className="section" id="projects">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="folder-open" size={14} />
                        My Work
                    </span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        Real projects I've built to learn and demonstrate practical data science skills.
                    </p>
                </div>

                <FeaturedProject project={PROJECTS.featured} />

                {PROJECTS.secondary.length > 0 && (
                    <div className="projects-grid">
                        {PROJECTS.secondary.map((project, i) => (
                            <ProjectCard key={i} project={project} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function FeaturedProject({ project }) {
    const ref = useScrollAnimation();
    return (
        <div className="featured-project animate-on-scroll" ref={ref}>
            <div className="featured-project-inner">
                <div className="featured-project-visual">
                    <div className="project-visual-content">
                        <div className="project-visual-chart" aria-hidden="true">
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                            <div className="chart-bar"></div>
                        </div>
                        <span className="project-visual-label">Prediction Model Visualization</span>
                    </div>
                </div>

                <div className="featured-project-content">
                    <span className="project-featured-badge">
                        <LucideIcon name="star" size={13} />
                        {project.badge}
                    </span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech-stack">
                        {project.technologies.map(tech => (
                            <span className="project-tech-tag" key={tech}>{tech}</span>
                        ))}
                    </div>
                    <div className="project-actions">
                        <a href={project.repo} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                            <LucideIcon name="github" size={16} />
                            Explore on GitHub
                        </a>
                    </div>
                </div>
            </div>

            {project.details && (
                <div className="project-details-grid" style={{ padding: "0 var(--space-2xl) var(--space-2xl)" }}>
                    {project.details.map((detail, i) => (
                        <div className="project-detail-card card" key={i}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-sm)" }}>
                                {detail.icon && <LucideIcon name={detail.icon} size={16} />}
                                <h4 style={{ margin: 0 }}>{detail.title}</h4>
                            </div>
                            {detail.content && <p>{detail.content}</p>}
                            {detail.items && (
                                <ul>
                                    {detail.items.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project, index }) {
    const ref = useScrollAnimation();
    return (
        <div className={`project-card card animate-on-scroll animate-delay-${(index % 4) + 1}`} ref={ref}>
            <div className="project-card-header">
                <div className="project-card-icon">
                    <LucideIcon name="folder-git-2" size={20} />
                </div>
                <div className="project-card-links">
                    {project.repo && (
                        <a href={project.repo} className="project-card-link" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                            <LucideIcon name="github" size={18} />
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} className="project-card-link" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo`}>
                            <LucideIcon name="external-link" size={18} />
                        </a>
                    )}
                </div>
            </div>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>
            <div className="project-card-footer">
                {project.technologies.map(tech => (
                    <span className="project-tech-tag" key={tech}>{tech}</span>
                ))}
            </div>
        </div>
    );
}

/* ── CONTACT COMPONENT ────────────────────────────────────── */

function Contact() {
    const ref = useScrollAnimation();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Please enter your name.";
        if (!form.email.trim()) newErrors.email = "Please enter your email.";
        else if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email address.";
        if (!form.message.trim()) newErrors.message = "Please enter a message.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
            const body = encodeURIComponent(
                `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
            );
            window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={ref}>
                    <span className="section-label">
                        <LucideIcon name="send" size={14} />
                        Let's Connect
                    </span>
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Whether you have a question, a project idea, or just want to connect — I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-grid">
                    <ContactInfo />
                    <ContactForm
                        form={form}
                        errors={errors}
                        submitted={submitted}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </section>
    );
}

function ContactInfo() {
    const ref = useScrollAnimation();
    return (
        <div className="contact-info animate-on-scroll" ref={ref}>
            <p className="contact-intro">
                I'm actively looking for internships, collaborations, and freelance opportunities in data science and machine learning. 
                Feel free to reach out through any of the channels below or use the contact form.
            </p>
            <div className="contact-methods">
                <a href={`mailto:${PROFILE.email}`} className="contact-method">
                    <span className="contact-method-icon"><LucideIcon name="mail" size={20} /></span>
                    <div>
                        <span className="contact-method-label">Email</span>
                        <span className="contact-method-value">{PROFILE.email}</span>
                    </div>
                </a>
                <a href={PROFILE.linkedin} className="contact-method" target="_blank" rel="noopener noreferrer">
                    <span className="contact-method-icon"><LucideIcon name="linkedin" size={20} /></span>
                    <div>
                        <span className="contact-method-label">LinkedIn</span>
                        <span className="contact-method-value">Khaled Azmy</span>
                    </div>
                </a>
                <a href={PROFILE.github} className="contact-method" target="_blank" rel="noopener noreferrer">
                    <span className="contact-method-icon"><LucideIcon name="github" size={20} /></span>
                    <div>
                        <span className="contact-method-label">GitHub</span>
                        <span className="contact-method-value">khaledazmy54</span>
                    </div>
                </a>
                <div className="contact-method">
                    <span className="contact-method-icon"><LucideIcon name="phone" size={20} /></span>
                    <div>
                        <span className="contact-method-label">Phone</span>
                        <span className="contact-method-value">{PROFILE.phone}</span>
                    </div>
                </div>
                <div className="contact-method">
                    <span className="contact-method-icon"><LucideIcon name="map-pin" size={20} /></span>
                    <div>
                        <span className="contact-method-label">Location</span>
                        <span className="contact-method-value">{PROFILE.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactForm({ form, errors, submitted, onChange, onSubmit }) {
    const ref = useScrollAnimation();
    return (
        <form className="contact-form animate-on-scroll" ref={ref} onSubmit={onSubmit} noValidate>
            <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name *</label>
                <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span className="form-error" id="name-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email *</label>
                <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span className="form-error" id="email-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Tell me about your project, question, or opportunity..."
                    value={form.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && <span className="form-error" id="message-error" role="alert">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <LucideIcon name="send" size={16} />
                Send Message
            </button>

            <p className="form-note">
                <LucideIcon name="info" size={12} /> This form opens your default email application with a pre-filled message. No data is sent to a server.
            </p>

            {submitted && (
                <div className="form-success" role="status">
                    ✓ Your email client should have opened. If not, you can email me directly at {PROFILE.email}
                </div>
            )}
        </form>
    );
}

/* ── FOOTER COMPONENT ─────────────────────────────────────── */

function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-left">
                        <span className="footer-name">{PROFILE.name}</span>
                        <span className="footer-role">{PROFILE.role}</span>
                    </div>
                    <div className="footer-links">
                        <a href={PROFILE.github} className="footer-link" target="_blank" rel="noopener noreferrer">
                            <LucideIcon name="github" size={14} /> GitHub
                        </a>
                        <a href={PROFILE.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
                            <LucideIcon name="linkedin" size={14} /> LinkedIn
                        </a>
                        <a href={`mailto:${PROFILE.email}`} className="footer-link">
                            <LucideIcon name="mail" size={14} /> Email
                        </a>
                    </div>
                    <span className="footer-copyright">
                        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

/* ── BACK TO TOP ──────────────────────────────────────────── */

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <button
            className={`back-to-top ${visible ? "visible" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
        >
            <LucideIcon name="chevron-up" size={20} />
        </button>
    );
}

/* ── APP (ROOT COMPONENT) ─────────────────────────────────── */

function App() {
    return (
        <React.Fragment>
            {/* Background Effects */}
            <div className="bg-grid" aria-hidden="true"></div>
            <div className="bg-gradient-top" aria-hidden="true"></div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main>
                <Hero />
                <About />
                <Education />
                <Skills />
                <Experience />
                <Services />
                <Projects />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Utilities */}
            <BackToTop />
        </React.Fragment>
    );
}

/* ── MOUNT ────────────────────────────────────────────────── */
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
