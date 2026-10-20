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
  "Full-stack software developer with 5 years of experience in agile, fast-paced environments, working both independently and as part of a team to deliver solutions. I analyze business requirements, then design, build, test and maintain web applications. I also use AI coding assistants to speed up prototyping, testing and debugging.",
  "Développement logiciel full-stack avec 5 ans d’expérience en milieu agile et rapide, en solo comme en équipe. J’analyse les besoins d’affaires, puis je conçois, développe, teste et maintiens des applications web. J’utilise aussi des assistants de codage IA pour accélérer le prototypage, les tests et le débogage.",
  "Lập trình viên phần mềm full-stack với 5 năm kinh nghiệm trong môi trường agile, nhịp độ nhanh, làm việc độc lập và theo nhóm. Tôi phân tích yêu cầu nghiệp vụ rồi thiết kế, xây dựng, kiểm thử và bảo trì ứng dụng web. Tôi cũng dùng trợ lý lập trình AI để tăng tốc việc tạo mẫu, kiểm thử và gỡ lỗi.",
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
        "Partner with designers, CRM specialists and product managers to turn business requirements into features, shipping 15+ features across 8 sprints.",
        "Collaboration avec des designers, des spécialistes CRM et des gestionnaires de produit pour transformer les besoins d’affaires en fonctionnalités : plus de 15 livrées en 8 sprints.",
        "Phối hợp với nhà thiết kế, chuyên viên CRM và quản lý sản phẩm để biến yêu cầu nghiệp vụ thành tính năng, bàn giao hơn 15 tính năng trong 8 sprint.",
      ),
      l(
        "Diagnose and fix bugs independently using object-oriented programming and design patterns, substantially improving platform functionality.",
        "Diagnostic et correction autonomes des bogues grâce à la programmation orientée objet et aux patrons de conception, pour une nette amélioration de la plateforme.",
        "Tự chẩn đoán và sửa lỗi bằng lập trình hướng đối tượng và các mẫu thiết kế, cải thiện đáng kể chức năng của nền tảng.",
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
        "Built client-facing platform modules in React and JavaScript, paying close attention to small design details for a sleek, cohesive interface.",
        "Création de modules destinés aux clients en React et JavaScript, avec un souci du détail pour une interface soignée et cohérente.",
        "Xây dựng các mô-đun hướng đến khách hàng bằng React và JavaScript, chú trọng từng chi tiết thiết kế để có giao diện tinh gọn và nhất quán.",
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
        "Worked with cross-functional teams to assess customer needs, write user requirements and document decisions and tasks.",
        "Collaboration avec des équipes multidisciplinaires pour évaluer les besoins des clients, rédiger les exigences et documenter les décisions et les tâches.",
        "Làm việc với các nhóm liên chức năng để đánh giá nhu cầu khách hàng, viết yêu cầu người dùng và ghi lại các quyết định, công việc cần làm.",
      ),
      l(
        "Built and maintained internal infrastructure integrating AWS Lambda and the DocuSign API, improving client latency and meeting industry compliance standards.",
        "Mise en place et maintenance de l’infrastructure interne intégrant AWS Lambda et l’API DocuSign, pour réduire la latence et respecter les normes de conformité.",
        "Xây dựng và duy trì hạ tầng nội bộ tích hợp AWS Lambda và API DocuSign, cải thiện độ trễ cho khách hàng và đáp ứng tiêu chuẩn tuân thủ của ngành.",
      ),
      l(
        "Assessed the platform on my own and proposed accessibility improvements to more than 25% of its user experience, following WCAG 2.2.",
        "Évaluation autonome de la plateforme et propositions d’amélioration de l’accessibilité touchant plus de 25 % de l’expérience utilisateur, selon les WCAG 2.2.",
        "Tự đánh giá nền tảng và đề xuất cải thiện khả năng truy cập cho hơn 25% trải nghiệm người dùng, theo WCAG 2.2.",
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
      "[Placeholder] A third topic",
      "[Exemple] Un troisième sujet",
      "[Mẫu] Chủ đề thứ ba",
    ),
    why: l(
      "Replace with one sentence on where you are learning it.",
      "Remplacer par une phrase sur la source de votre apprentissage.",
      "Thay bằng một câu về nơi bạn đang học nó.",
    ),
  },
];

export const howIWork: { paragraphs: L10n[] } = {
  paragraphs: [
    l(
      "I start with the requirements and write them down. Documenting APIs in OpenAPI and recording decisions as I go means the next developer, or future me, can pick the work up without a meeting.",
      "Je commence par les besoins, et je les mets par écrit. Documenter les API avec OpenAPI et consigner les décisions au fur et à mesure permet à la prochaine personne, ou à moi plus tard, de reprendre le travail sans réunion.",
      "Tôi bắt đầu từ yêu cầu và ghi chúng lại. Viết tài liệu API bằng OpenAPI và ghi lại các quyết định trong quá trình làm giúp người tiếp theo, hoặc chính tôi sau này, tiếp tục công việc mà không cần họp.",
    ),
    l(
      "I review code for more than style. Performance, data integrity and security get checked on every pull request, because they are the expensive things to fix after release.",
      "Je révise le code pour plus que le style. La performance, l’intégrité des données et la sécurité sont vérifiées à chaque demande de fusion, car ce sont les choses coûteuses à corriger après la mise en production.",
      "Tôi rà soát mã không chỉ về phong cách. Hiệu năng, toàn vẹn dữ liệu và bảo mật được kiểm tra ở mỗi pull request, vì đó là những thứ tốn kém nhất nếu phải sửa sau khi phát hành.",
    ),
    l(
      "I build for everyone who will use the product. I test against WCAG 2.2 as part of normal work, not as a final pass, and I measure whether a change actually made the experience better.",
      "Je conçois pour toutes les personnes qui utiliseront le produit. Je teste selon les WCAG 2.2 dans le travail courant, pas seulement à la fin, et je mesure si un changement a vraiment amélioré l’expérience.",
      "Tôi xây dựng cho tất cả những ai sẽ dùng sản phẩm. Tôi kiểm tra theo WCAG 2.2 trong công việc hằng ngày chứ không để đến cuối, và đo xem một thay đổi có thực sự cải thiện trải nghiệm hay không.",
    ),
  ],
};
