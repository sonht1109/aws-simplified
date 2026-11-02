/* AWS Simplified — shared navigation, theme, quiz wiring.
   Each lesson page sets <body data-page="NN">. */
(function () {
  var PAGES = [
    { n: 1,  slug: "01-course-roadmap",        cat: "Foundations", title: "Course Roadmap: AWS for DevOps", desc: "What this course covers, in which order, and how DevOps engineers use AWS day to day." },
    { n: 2,  slug: "02-intro-to-aws",          cat: "Foundations", title: "Introduction to AWS & the Cloud", desc: "Public vs private cloud, why companies move to AWS, regions, and creating your free account." },
    { n: 3,  slug: "03-iam",                   cat: "Security",    title: "IAM: Who Can Do What", desc: "Users, groups, roles and policies — controlling access to your AWS account." },
    { n: 4,  slug: "04-ec2",                   cat: "Compute",     title: "EC2: Virtual Servers", desc: "Instances, AMIs, instance types, key pairs — and deploying Jenkins on a server." },
    { n: 5,  slug: "05-connect-to-ec2",        cat: "Compute",     title: "Connecting to EC2 from Windows", desc: "SSH into your instance with MobaXterm or PuTTY using a key pair." },
    { n: 6,  slug: "06-vpc",                   cat: "Networking",  title: "VPC: Your Private Network", desc: "Subnets, internet gateway, route tables, NAT — how traffic reaches your servers." },
    { n: 7,  slug: "07-security-groups-nacl",  cat: "Networking",  title: "Security Groups vs NACLs", desc: "Two layers of firewall: stateful at the server, stateless at the subnet." },
    { n: 8,  slug: "08-route53",               cat: "Networking",  title: "Route 53: DNS on AWS", desc: "How names become IP addresses, hosted zones, records and health checks." },
    { n: 9,  slug: "09-vpc-production-project",cat: "Projects",    title: "Project: Production-style VPC", desc: "Public + private subnets, bastion host, auto scaling and a load balancer in one build." },
    { n: 10, slug: "10-interview-ec2-iam-vpc", cat: "Interview",   title: "Scenario Questions: EC2, IAM, VPC", desc: "Real interview scenarios on what you learned so far, with model answers." },
    { n: 11, slug: "11-s3",                    cat: "Storage",     title: "S3: Object Storage", desc: "Buckets, objects, versioning, storage classes, bucket policies and static websites." },
    { n: 12, slug: "12-aws-cli",               cat: "Tools",       title: "AWS CLI", desc: "Talk to AWS from your terminal: install, configure access keys, run commands." },
    { n: 13, slug: "13-cloudformation",        cat: "IaC",         title: "Infrastructure as Code with CloudFormation", desc: "Describe infrastructure in YAML templates, create stacks, detect drift." },
    { n: 14, slug: "14-cicd-codecommit",       cat: "CI/CD",       title: "CI/CD Basics & CodeCommit", desc: "What continuous integration and delivery mean, and AWS's Git hosting service." },
    { n: 15, slug: "15-codepipeline",          cat: "CI/CD",       title: "CodePipeline vs Jenkins", desc: "How AWS's pipeline service orchestrates stages, and when to pick it over Jenkins." },
    { n: 16, slug: "16-codebuild-ci",          cat: "CI/CD",       title: "Project: CI with CodeBuild", desc: "Build, test and push a Docker image automatically from GitHub with CodeBuild." },
    { n: 17, slug: "17-codedeploy-cd",         cat: "CI/CD",       title: "Project: CD with CodeDeploy", desc: "Finish the pipeline: deploy the built image to EC2 with CodeDeploy." },
    { n: 18, slug: "18-cloudwatch",            cat: "Monitoring",  title: "CloudWatch: Metrics, Logs, Alarms", desc: "Watch your resources, collect logs, and get alerted when CPU spikes." },
    { n: 19, slug: "19-lambda",                cat: "Serverless",  title: "Lambda: Serverless Functions", desc: "Run code without servers, triggered by events — and how DevOps teams use it." },
    { n: 20, slug: "20-cost-optimization",     cat: "Cost",        title: "Cloud Cost Optimization Project", desc: "Find and clean up stale resources automatically with Lambda." },
    { n: 21, slug: "21-cloudfront",            cat: "Networking",  title: "CloudFront: Content Delivery Network", desc: "Serve content fast worldwide from edge locations, with S3 as the origin." },
    { n: 22, slug: "22-ecr",                   cat: "Containers",  title: "ECR: Container Registry", desc: "Store Docker images privately on AWS — and how it compares to Docker Hub." },
    { n: 23, slug: "23-ecs",                   cat: "Containers",  title: "ECS: Running Containers", desc: "AWS's own container orchestrator, Fargate, and ECS vs EKS vs Kubernetes." },
    { n: 24, slug: "24-eks",                   cat: "Containers",  title: "Project: Kubernetes on EKS", desc: "Create an EKS cluster and expose an app with an ingress and AWS load balancer." },
    { n: 25, slug: "25-secrets-management",    cat: "Security",    title: "Secrets Management", desc: "Secrets Manager vs Parameter Store vs HashiCorp Vault — where passwords should live." },
    { n: 26, slug: "26-terraform",             cat: "IaC",         title: "Terraform with AWS", desc: "Write Terraform to build a VPC, EC2, S3 and load balancer project." },
    { n: 27, slug: "27-aws-config",            cat: "Security",    title: "AWS Config: Compliance Checks", desc: "Spot compliant and non-compliant resources with rules — even custom Lambda rules." },
    { n: 28, slug: "28-load-balancers",        cat: "Networking",  title: "Load Balancers: ALB vs NLB vs GWLB", desc: "Spread traffic across servers, and pick the right balancer for the job." },
    { n: 29, slug: "29-interview-qa",          cat: "Interview",   title: "AWS Interview Q&A Collection", desc: "How to use a big bank of AWS DevOps interview questions across 30 services." },
    { n: 30, slug: "30-cloud-migration",       cat: "Strategy",    title: "Migrating Applications to AWS", desc: "The 7 Rs of migration and how a real migration project runs." },
    { n: 31, slug: "31-crack-devops-job",      cat: "Career",      title: "How to Land an AWS DevOps Job", desc: "Five practical tips for preparing, building projects and interviewing." },
    { n: 32, slug: "32-three-tier-architecture",cat: "Projects",   title: "Three-Tier Architecture on AWS", desc: "Web, app and database tiers — the classic production layout." },
    { n: 33, slug: "33-eks-ecommerce-project", cat: "Projects",    title: "Project: E-Commerce App on EKS", desc: "Deploy a multi-service shop on EKS, step by step." },
    { n: 34, slug: "34-eks-terraform",         cat: "IaC",         title: "Project: EKS + VPC with Terraform", desc: "Use Terraform modules to create a production-ready EKS cluster and VPC." },
    { n: 35, slug: "35-shell-scripting-project",cat: "Projects",   title: "Shell Scripting: AWS Resource Report", desc: "A beginner shell script that lists your AWS resources on a schedule." },
    { n: 36, slug: "36-reduce-aws-bill",       cat: "Cost",        title: "Reducing Your AWS Bill", desc: "Read your bill, find forgotten resources in every region, set budgets." },
    { n: 37, slug: "37-codecatalyst",          cat: "CI/CD",       title: "Amazon CodeCatalyst", desc: "AWS's all-in-one dev platform: repos, workflows and environments together." },
    { n: 38, slug: "38-amazon-q-cli",          cat: "Tools",       title: "Amazon Q Developer CLI", desc: "Use an AI assistant in your terminal to automate DevOps tasks." },
    { n: 39, slug: "39-elasticache-valkey",    cat: "Databases",   title: "ElastiCache: Redis vs Valkey", desc: "Caching to speed up apps, and why Valkey forked from Redis." },
    { n: 40, slug: "40-eks-auto-mode",         cat: "Containers",  title: "EKS Auto Mode", desc: "Let AWS manage nodes, scaling and add-ons for your Kubernetes cluster." }
  ];
  window.AWS_PAGES = PAGES;

  var VISITED_KEY = "awss-visited";
  function getVisited() { try { return JSON.parse(localStorage.getItem(VISITED_KEY) || "[]"); } catch (e) { return []; } }
  function markVisited(n) { try { var v = getVisited(); if (v.indexOf(n) < 0) { v.push(n); localStorage.setItem(VISITED_KEY, JSON.stringify(v)); } } catch (e) {} }
  window.AWS_VISITED = getVisited;

  /* theme */
  var THEME_KEY = "awss-theme";
  function applyTheme(t) { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); }
  try { applyTheme(localStorage.getItem(THEME_KEY)); } catch (e) {}
  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function toggleTheme() {
    var next = isDark() ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    var b = document.getElementById("theme-btn"); if (b) b.textContent = isDark() ? "☀ Light" : "☾ Dark";
  }

  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function topbar(base, crumb, pct) {
    return el(
      '<header class="topbar"><div class="topbar-inner">' +
        '<a class="brand" href="' + base + 'index.html"><span class="brand-mark">AWS</span><span>Simplified</span></a>' +
        '<div class="crumb">' + crumb + '</div>' +
        '<a class="tb-link" href="' + base + 'index.html">☰ All lessons</a>' +
        '<button id="theme-btn" type="button">' + (isDark() ? "☀ Light" : "☾ Dark") + '</button>' +
      '</div><div class="progress-bar"><span style="width:' + pct + '%"></span></div></header>'
    );
  }
  function footer() {
    return el(
      '<footer class="site-footer">' +
        '<p><span class="ai-note">🤖 This content is AI-generated</span></p>' +
        '<p>Lessons were written by AI from transcripts of a <a href="https://www.youtube.com/playlist?list=PLdpzxOOAlwvLNOxX0RfndiYSt1Le9azze" target="_blank" rel="noopener noreferrer">40-video YouTube AWS series</a>. They may contain mistakes — always check the official AWS documentation before using anything in production.</p>' +
      '</footer>'
    );
  }

  function wireQuizzes(root) {
    /* <div class="quiz" data-answer="1"><div class="q">…</div><div class="opts"><button>…</button>…</div><div class="explain">…</div></div>
       data-answer is the 0-based index of the right button. */
    Array.prototype.forEach.call(root.querySelectorAll(".quiz"), function (qz) {
      var ans = parseInt(qz.getAttribute("data-answer"), 10);
      var btns = qz.querySelectorAll(".opts button");
      Array.prototype.forEach.call(btns, function (b, i) {
        b.type = "button";
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(btns, function (x, j) { x.disabled = true; if (j === ans) x.classList.add("right"); });
          if (i !== ans) b.classList.add("wrong");
          qz.classList.add("done");
        });
      });
    });
  }

  function initLesson(n) {
    var i = n - 1, p = PAGES[i];
    if (!p) return;
    markVisited(n);
    var prev = PAGES[i - 1], next = PAGES[i + 1];
    document.title = p.title + " · AWS Simplified";
    var pct = Math.round((n / PAGES.length) * 100);
    document.body.insertBefore(topbar("../", 'Lesson <b>' + n + '</b> of ' + PAGES.length + ' · ' + esc(p.title), pct), document.body.firstChild);

    var main = document.querySelector("main.wrap");
    var head = main && main.querySelector(".page-head");
    if (head && !head.querySelector(".page-kicker")) {
      head.insertBefore(el('<div class="page-kicker">Lesson ' + n + ' <span class="chip">' + esc(p.cat) + '</span></div>'), head.firstChild);
    }
    var pager = el('<nav class="pager" aria-label="Lesson navigation"></nav>');
    if (prev) pager.appendChild(el('<a class="prev" href="' + prev.slug + '.html" rel="prev"><small>← Previous</small><span>' + esc(prev.title) + '</span></a>'));
    if (next) pager.appendChild(el('<a class="next" href="' + next.slug + '.html" rel="next"><small>Next →</small><span>' + esc(next.title) + '</span></a>'));
    else pager.appendChild(el('<a class="next" href="../index.html"><small>Finished! →</small><span>Back to all lessons</span></a>'));
    (main || document.body).appendChild(pager);
    document.body.appendChild(footer());

    document.addEventListener("keydown", function (e) {
      var t = e.target && e.target.tagName;
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowLeft" && prev) location.href = prev.slug + ".html";
      if (e.key === "ArrowRight") location.href = next ? next.slug + ".html" : "../index.html";
    });
  }

  function initIndex() {
    document.body.insertBefore(topbar("", "40 lessons · from zero to production", 0), document.body.firstChild);
    document.body.appendChild(footer());
    var visited = getVisited();
    var list = document.getElementById("lessons");
    var search = document.getElementById("search");
    var filters = document.getElementById("filters");
    var cats = [];
    PAGES.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    var active = "All";
    ["All"].concat(cats).forEach(function (c) {
      var b = el('<button type="button">' + esc(c) + '</button>');
      if (c === active) b.classList.add("on");
      b.addEventListener("click", function () {
        active = c;
        Array.prototype.forEach.call(filters.children, function (x) { x.classList.toggle("on", x === b); });
        render();
      });
      filters.appendChild(b);
    });
    var vc = document.getElementById("visited-count");
    if (vc) vc.textContent = visited.length;

    var GROUPS = [
      { name: "Part 1 · Foundations & Networking", from: 1, to: 10 },
      { name: "Part 2 · Storage, Tools & CI/CD", from: 11, to: 17 },
      { name: "Part 3 · Monitoring, Serverless & Cost", from: 18, to: 21 },
      { name: "Part 4 · Containers, Security & IaC", from: 22, to: 28 },
      { name: "Part 5 · Career, Architecture & Projects", from: 29, to: 35 },
      { name: "Part 6 · Bonus Deep Dives", from: 36, to: 40 }
    ];
    function render() {
      var q = (search.value || "").toLowerCase().trim();
      list.innerHTML = "";
      var shown = 0;
      GROUPS.forEach(function (g) {
        var items = PAGES.filter(function (p) {
          if (p.n < g.from || p.n > g.to) return false;
          if (active !== "All" && p.cat !== active) return false;
          if (q && (p.title + " " + p.desc + " " + p.cat).toLowerCase().indexOf(q) < 0) return false;
          return true;
        });
        if (!items.length) return;
        list.appendChild(el('<h2 class="section-title">' + esc(g.name) + '</h2>'));
        var grid = el('<div class="lesson-grid"></div>');
        items.forEach(function (p) {
          shown++;
          grid.appendChild(el(
            '<a class="lesson' + (visited.indexOf(p.n) >= 0 ? ' visited' : '') + '" href="pages/' + p.slug + '.html">' +
              '<span class="num">' + p.n + '</span>' +
              '<span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></span>' +
            '</a>'
          ));
        });
        list.appendChild(grid);
      });
      if (!shown) list.appendChild(el('<p class="empty">No lessons match that search.</p>'));
    }
    search.addEventListener("input", render);
    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var n = parseInt(document.body.getAttribute("data-page"), 10);
    if (n) initLesson(n); else if (document.body.hasAttribute("data-index")) initIndex();
    wireQuizzes(document);
    document.addEventListener("click", function (e) { if (e.target && e.target.id === "theme-btn") toggleTheme(); });
  });
})();
