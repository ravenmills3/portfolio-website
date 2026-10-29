// Career data. Every locale lives together.
import type { LocaleCode } from "./routes";

export type L10n = Record<LocaleCode, string>;
const l = (en: string, fr: string, vi: string): L10n => ({
  en,
  "fr-ca": fr,
  "vi-vn": vi,
});

export const headline = l(
  "Full-Stack Developer, EIT",
  "Développement full-stack, ingénieur stagiaire (EIT)",
  "Lập trình viên full-stack, kỹ sư tập sự (EIT)",
);

export const summary = l(
  "Full-stack software developer with 5 years of experience delivering web applications in agile, fast-paced teams. I take features from business requirements through design, build, testing and maintenance, working independently or as part of a team. I'm working toward my P.Eng. and senior full-stack responsibilities: architecture, mentoring and owning features end to end.",
  "Développement logiciel full-stack avec 5 ans d’expérience à livrer des applications web au sein d’équipes agiles au rythme soutenu. Je mène les fonctionnalités des besoins d’affaires à la conception, au développement, aux tests et à la maintenance, en autonomie comme en équipe. Je travaille à obtenir mon titre d’ing. et à assumer des responsabilités full-stack de niveau senior : architecture, mentorat et prise en charge complète des fonctionnalités.",
  "Lập trình viên phần mềm full-stack với 5 năm kinh nghiệm phát triển ứng dụng web trong các nhóm agile có nhịp độ nhanh. Tôi đưa tính năng đi từ yêu cầu nghiệp vụ qua thiết kế, xây dựng, kiểm thử đến bảo trì, làm việc độc lập hoặc theo nhóm. Tôi đang hướng tới giấy phép kỹ sư chuyên nghiệp (P.Eng.) và các trách nhiệm full-stack cấp cao: kiến trúc, cố vấn và làm chủ tính năng từ đầu đến cuối.",
);

export interface SkillGroup {
  id: string;
  title: L10n;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    id: "languages",
    title: l(
      "Languages and frameworks",
      "Langages et cadriciels",
      "Ngôn ngữ và framework",
    ),
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C/C#",
      "HTML",
      "CSS/SCSS",
      "React.js",
      "Vue.js",
      "Next.js",
      "Nuxt.js",
      "React Native",
      "Node.js",
      "Express.js",
      "Django",
      "Jest",
      "Playwright",
    ],
  },
  {
    id: "api",
    title: l("APIs and integrations", "API et intégrations", "API và tích hợp"),
    items: [
      "RESTful API design",
      "OpenAPI/Swagger",
      "GraphQL",
      "Postman",
      "AWS",
      "DocuSign",
    ],
  },
  {
    id: "data",
    title: l("Databases", "Bases de données", "Cơ sở dữ liệu"),
    items: ["SQL/NoSQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "devops",
    title: l("DevOps and tools", "DevOps et outils", "DevOps và công cụ"),
    items: [
      "Git",
      "GitHub Actions",
      "Docker",
      "AWS Developer Cloud",
      "Linux",
      "Eclipse",
      "Visual Studio Code",
      "JIRA",
      "ZOHO",
      "Slack",
    ],
  },
  {
    id: "practices",
    title: l("Practices", "Pratiques", "Phương pháp"),
    items: [
      "Agile/Scrum",
      "Code review and maintainability",
      "Data integrity and security",
      "WCAG 2.2 accessibility",
    ],
  },
];

export const spokenLanguages = [
  {
    id: "en",
    name: l("English", "Anglais", "Tiếng Anh"),
    level: l("Fluent (CEFR C2)", "Courant (CECR C2)", "Thành thạo (CEFR C2)"),
  },
  {
    id: "fr",
    name: l("French", "Français", "Tiếng Pháp"),
    level: l(
      "Working proficiency (CEFR B1 / NCLC 5)",
      "Compétence professionnelle (CECR B1 / NCLC 5)",
      "Trình độ làm việc (CEFR B1 / NCLC 5)",
    ),
  },
];

export interface Role {
  id: string;
  company: string;
  place: string;
  title: L10n;
  start: string;
  end: string | null;
  bullets: L10n[];
}

// Newest first. Dates are YYYY-MM; a null end means present.
export const roles: Role[] = [
  {
    id: "samawada",
    company: "Samawada",
    place: "Ottawa, ON",
    start: "2026-03",
    end: null,
    title: l(
      "Full-Stack Developer (Volunteer)",
      "Développement full-stack (bénévole)",
      "Lập trình viên full-stack (tình nguyện)",
    ),
    bullets: [
      l(
        "Build and maintain front-end interfaces for the web platform with Next.js, TypeScript and React, using strict-mode typing to eliminate runtime type errors.",
        "Création et maintenance des interfaces de la plateforme web avec Next.js, TypeScript et React, en mode strict pour éliminer les erreurs de typage à l’exécution.",
        "Xây dựng và duy trì giao diện cho nền tảng web bằng Next.js, TypeScript và React, dùng chế độ strict để loại bỏ lỗi kiểu dữ liệu khi chạy.",
      ),
      l(
        "Develop cross-platform modules with React Native and Expo, deploying to web, iOS and Android from a single codebase.",
        "Développement de modules multiplateformes avec React Native et Expo, déployés sur le web, iOS et Android à partir d’une seule base de code.",
        "Phát triển các mô-đun đa nền tảng bằng React Native và Expo, triển khai lên web, iOS và Android từ một mã nguồn duy nhất.",
      ),
      l(
        "Document code, architecture and API specifications with OpenAPI/Swagger to standardize handoffs and shorten developer onboarding.",
        "Documentation du code, de l’architecture et des spécifications d’API avec OpenAPI/Swagger pour uniformiser les transferts et réduire le temps d’intégration.",
        "Viết tài liệu mã nguồn, kiến trúc và đặc tả API bằng OpenAPI/Swagger để chuẩn hóa bàn giao và rút ngắn thời gian làm quen của lập trình viên mới.",
      ),
      l(
        "Partner with designers, CRM specialists and product managers to turn business requirements into features, shipping more than 15 features across 8 sprints.",
        "Collaboration avec des designers, des spécialistes CRM et des gestionnaires de produit pour transformer les besoins d’affaires en fonctionnalités : plus de 15 livrées en 8 sprints.",
        "Phối hợp với nhà thiết kế, chuyên viên CRM và quản lý sản phẩm để biến yêu cầu nghiệp vụ thành tính năng, bàn giao hơn 15 tính năng trong 8 sprint.",
      ),
      l(
        "Independently diagnose and resolve bugs with object-oriented design and design patterns, substantially improving platform functionality.",
        "Diagnostic et résolution autonomes des bogues grâce à la conception orientée objet et aux patrons de conception, pour une nette amélioration de la plateforme.",
        "Tự chẩn đoán và khắc phục lỗi bằng thiết kế hướng đối tượng và các mẫu thiết kế, cải thiện đáng kể chức năng của nền tảng.",
      ),
    ],
  },
  {
    id: "four-eyes",
    company: "Four Eyes Financial",
    place: "Saint John, NB",
    start: "2021-05",
    end: "2025-06",
    title: l(
      "Full-Stack Developer",
      "Développement full-stack",
      "Lập trình viên full-stack",
    ),
    bullets: [
      l(
        "Built client-facing platform modules in React and JavaScript, delivering a polished, cohesive interface down to the smallest design details.",
        "Création de modules destinés aux clients en React et JavaScript, pour une interface soignée et cohérente jusque dans les moindres détails.",
        "Xây dựng các mô-đun hướng đến khách hàng bằng React và JavaScript, mang lại giao diện tinh tế, nhất quán đến từng chi tiết nhỏ nhất.",
      ),
      l(
        "Cut API response times by 20% by redesigning RESTful APIs in Flask (Python) and GraphQL, improving node interoperability.",
        "Réduction de 20 % des temps de réponse en repensant des API REST en Flask (Python) et GraphQL, pour une meilleure interopérabilité.",
        "Giảm 20% thời gian phản hồi API nhờ thiết kế lại API RESTful bằng Flask (Python) và GraphQL, cải thiện khả năng tương tác giữa các nút.",
      ),
      l(
        "Wrote efficient SQL queries for multiple client schemas in PostgreSQL, supporting data management, regression testing and customization.",
        "Rédaction de requêtes SQL efficaces pour plusieurs schémas clients dans PostgreSQL : gestion des données, régression et personnalisation.",
        "Viết truy vấn SQL hiệu quả cho nhiều lược đồ khách hàng trên PostgreSQL, phục vụ quản lý dữ liệu, kiểm thử hồi quy và tùy biến.",
      ),
      l(
        "Reviewed code in JavaScript, Python and SQL for performance, consistent standards, data integrity and security.",
        "Révision de code en JavaScript, Python et SQL : performance, respect des normes, intégrité des données et sécurité.",
        "Rà soát mã JavaScript, Python và SQL về hiệu năng, tiêu chuẩn mã nhất quán, toàn vẹn dữ liệu và bảo mật.",
      ),
      l(
        "Maintained private Git repositories on AWS CodeCommit, reviewing pull requests with configured linters and custom security checks.",
        "Maintenance de dépôts Git privés sur AWS CodeCommit, avec révision des demandes de fusion à l’aide de linters et de contrôles de sécurité personnalisés.",
        "Duy trì các kho Git riêng trên AWS CodeCommit, rà soát pull request bằng linter đã cấu hình và các bước kiểm tra bảo mật tùy chỉnh.",
      ),
      l(
        "Partnered with cross-functional teams to assess customer needs, define user requirements, and document decisions and tasks.",
        "Collaboration avec des équipes multidisciplinaires pour évaluer les besoins des clients, définir les exigences et documenter les décisions et les tâches.",
        "Phối hợp với các nhóm liên chức năng để đánh giá nhu cầu khách hàng, xác định yêu cầu người dùng và ghi lại các quyết định, công việc.",
      ),
      l(
        "Built and maintained internal infrastructure integrating AWS Lambda and the DocuSign API, improving client latency and meeting industry compliance standards.",
        "Mise en place et maintenance de l’infrastructure interne intégrant AWS Lambda et l’API DocuSign, pour réduire la latence et respecter les normes de conformité.",
        "Xây dựng và duy trì hạ tầng nội bộ tích hợp AWS Lambda và API DocuSign, cải thiện độ trễ cho khách hàng và đáp ứng tiêu chuẩn tuân thủ của ngành.",
      ),
      l(
        "Led an independent WCAG 2.2 accessibility review of the platform and proposed improvements covering more than 25% of its user experience.",
        "Direction d’un examen autonome de l’accessibilité de la plateforme selon les WCAG 2.2, avec des propositions d’amélioration touchant plus de 25 % de l’expérience utilisateur.",
        "Chủ trì một đợt đánh giá độc lập về khả năng truy cập của nền tảng theo WCAG 2.2 và đề xuất cải thiện cho hơn 25% trải nghiệm người dùng.",
      ),
    ],
  },
];

export interface Credential {
  id: string;
  name: L10n;
  issuer: string;
  start: number;
  end: number | "present";
  lapsed?: boolean;
}

export const credentials: Credential[] = [
  {
    id: "eit",
    name: l(
      "Engineer-in-Training (EIT)",
      "Ingénieur stagiaire (EIT)",
      "Kỹ sư tập sự (EIT)",
    ),
    issuer: "Professional Engineers Ontario",
    start: 2022,
    end: "present",
  },
  {
    id: "aws",
    name: l(
      "AWS Certified Developer, Associate",
      "AWS Certified Developer – Associate",
      "AWS Certified Developer – Associate",
    ),
    issuer: "Amazon Web Services",
    start: 2021,
    end: 2024,
  },
  {
    id: "bsc",
    name: l(
      "BSc, Software Engineering",
      "B. Sc., génie logiciel",
      "Cử nhân Kỹ thuật phần mềm",
    ),
    issuer: "University of New Brunswick",
    start: 2016,
    end: 2021,
  },
];

export interface Learning {
  id: string;
  topic: L10n;
  since: string;
  why: L10n;
  placeholder?: boolean;
}

export const currentlyLearning: Learning[] = [
  {
    id: "one",
    since: "2026-10",
    placeholder: true,
    topic: l(
      "[Placeholder] A topic I am learning now",
      "[Exemple] Un sujet que j’apprends en ce moment",
      "[Mẫu] Một chủ đề tôi đang học",
    ),
    why: l(
      "Replace with one sentence on why it matters to your work.",
      "Remplacer par une phrase sur l’utilité de ce sujet dans votre travail.",
      "Thay bằng một câu về lý do chủ đề này quan trọng với công việc.",
    ),
  },
  {
    id: "two",
    since: "2026-09",
    placeholder: true,
    topic: l(
      "[Placeholder] A second topic",
      "[Exemple] Un deuxième sujet",
      "[Mẫu] Chủ đề thứ hai",
    ),
    why: l(
      "Replace with one sentence on what you plan to build or try.",
      "Remplacer par une phrase sur ce que vous comptez essayer.",
      "Thay bằng một câu về điều bạn định thử hoặc xây dựng.",
    ),
  },
  {
    id: "three",
    since: "2026-08",
    placeholder: true,
    topic: l(
      "[Placeholder] A craft skill or a book I'm reading",
      "[Exemple] Un savoir-faire artisanal ou un livre que je lis",
      "[Mẫu] Một kỹ năng thủ công hoặc cuốn sách tôi đang đọc",
    ),
    why: l(
      "Replace with one sentence on what it's teaching you, at work or beyond it.",
      "Remplacer par une phrase sur ce qu’il vous apprend, au travail ou ailleurs.",
      "Thay bằng một câu về điều nó dạy bạn, trong công việc hay ngoài công việc.",
    ),
  },
];

export const howIWork: { paragraphs: L10n[] } = {
  paragraphs: [
    l(
      "I start every feature with written requirements and document APIs in OpenAPI, so anyone can pick up the work without a meeting.",
      "Je commence chaque fonctionnalité par des besoins écrits et je documente les API avec OpenAPI, pour que n’importe qui puisse reprendre le travail sans réunion.",
      "Tôi bắt đầu mỗi tính năng bằng yêu cầu viết rõ ràng và ghi tài liệu API bằng OpenAPI, để bất kỳ ai cũng có thể tiếp tục công việc mà không cần họp.",
    ),
    l(
      "I review every pull request for performance, data integrity and security, the things that cost most to fix after release.",
      "Je révise chaque demande de fusion pour la performance, l’intégrité des données et la sécurité, ce qui coûte le plus cher à corriger après la mise en production.",
      "Tôi rà soát mỗi pull request về hiệu năng, toàn vẹn dữ liệu và bảo mật, những thứ tốn kém nhất nếu phải sửa sau khi phát hành.",
    ),
    l(
      "I test against WCAG 2.2 as I build, not as a final pass, and measure whether each change improved the experience.",
      "Je teste selon les WCAG 2.2 au fil du développement, pas seulement à la fin, et je mesure si chaque changement a amélioré l’expérience.",
      "Tôi kiểm tra theo WCAG 2.2 ngay trong lúc xây dựng chứ không để đến cuối, và đo xem mỗi thay đổi có cải thiện trải nghiệm hay không.",
    ),
    l(
      "Next for me: my P.Eng., a senior role and professional French. Away from the keyboard, craft projects and books keep shaping how I build.",
      "Mes prochaines étapes : mon titre d’ing., un rôle senior et un français professionnel. Loin du clavier, l’artisanat et les livres continuent d’influencer ma façon de concevoir.",
      "Mục tiêu tiếp theo của tôi: giấy phép kỹ sư chuyên nghiệp (P.Eng.), vai trò cấp cao và tiếng Pháp chuyên nghiệp. Ngoài giờ làm, các dự án thủ công và những cuốn sách vẫn định hình cách tôi xây dựng phần mềm.",
    ),
  ],
};
