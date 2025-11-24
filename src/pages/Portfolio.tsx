import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Code,
  ExternalLink,
  Github,
  Calendar,
  Folder,
  ArrowRight,
  Briefcase,
  Globe,
  Zap,
  Building,
  Scale,
  Leaf,
  Server,
  Compass,
  Landmark,
  Users,
  Database,
  BarChart3,
  Star,
  Factory,
  Plane,
  Gavel,
  HardHat,
  Cpu,
  Filter,
  GraduationCap,
  ShieldCheck,
  Store,
  MapPin
} from "lucide-react";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const projects = [
    // ===== IT =====
    {
      name: "Datacare",
      description: "AI-integrated IT services and solutions provider offering cloud computing, cybersecurity, and enterprise technology solutions for businesses across East Africa.",
      github: "https://github.com/lewisgithinji/datacare",
      liveUrl: "https://datacare.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdatacare.co.ke?w=600&h=400",
      language: "TypeScript",
      category: "IT",
      country: "Kenya",
      icon: Server,
      features: ["AI Integration", "Cloud Services", "Cybersecurity", "Enterprise IT"],
      year: "2025"
    },
    {
      name: "Fabtech Solutions",
      description: "Information technology services company providing ICT solutions including software development, cloud computing, infrastructure management, cybersecurity, and ERP systems across East Africa.",
      github: null,
      liveUrl: "https://fabtechkenya.com",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ffabtechkenya.com?w=600&h=400",
      language: "TypeScript",
      category: "IT",
      country: "Kenya",
      icon: Cpu,
      features: ["Software Development", "Cloud Computing", "Cybersecurity", "ERP Systems"],
      year: "2025"
    },
    {
      name: "ThreeStar Consulting",
      description: "IT audit, software development, and business consulting services company providing digital solutions, security audits, and strategic advisory services to businesses in Kenya.",
      github: null,
      liveUrl: "https://threestar.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fthreestar.co.ke?w=600&h=400",
      language: "TypeScript",
      category: "IT",
      country: "Kenya",
      icon: ShieldCheck,
      features: ["IT Audit", "Software Development", "Business Consulting", "Security"],
      year: "2025"
    },
    {
      name: "SimbaHost",
      description: "Cloud services and web hosting platform offering reliable hosting solutions, domain registration, and cloud infrastructure services for businesses.",
      github: "https://github.com/lewisgithinji/simbahost",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "IT",
      country: "Kenya",
      icon: Globe,
      features: ["Web Hosting", "Domain Services", "Cloud Solutions", "Support Portal"],
      year: "2025"
    },

    // ===== SMEs =====
    {
      name: "Ignation Group",
      description: "Multi-sector conglomerate providing protective gear, sporting attire, medical & catering uniforms, security uniforms, cleaning services, and general merchandise distribution.",
      github: null,
      liveUrl: "https://ignationgroup.com",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fignationgroup.com?w=600&h=400",
      language: "WordPress",
      category: "SMEs",
      country: "Kenya",
      icon: Store,
      features: ["Protective Gear", "Uniforms", "Cleaning Services", "Merchandise"],
      year: "2025"
    },
    {
      name: "TeamFlow",
      description: "Team collaboration and project management platform designed to streamline workflows, enhance team communication, and boost productivity for modern workplaces.",
      github: "https://github.com/lewisgithinji/TeamFlow",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "SMEs",
      country: "Kenya",
      icon: Users,
      features: ["Team Management", "Task Tracking", "Collaboration", "Analytics"],
      year: "2025"
    },

    // ===== ENERGY =====
    {
      name: "Loop Energy",
      description: "Sustainable energy solutions platform promoting renewable energy services, solar installations, and green technology adoption for businesses and homes.",
      github: "https://github.com/lewisgithinji/loopenergy",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Energy",
      country: "Kenya",
      icon: Leaf,
      features: ["Renewable Energy", "Solar Solutions", "Green Technology", "Sustainability"],
      year: "2025"
    },

    {
      name: "Tusker Expeditions",
      description: "Travel and safari booking platform showcasing African wildlife expeditions, tour packages, and adventure experiences across East Africa.",
      github: "https://github.com/lewisgithinji/TuskerExpeditions",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "SMEs",
      country: "Kenya",
      icon: Compass,
      features: ["Safari Tours", "Booking System", "Travel Packages", "Adventure"],
      year: "2025"
    },

    // ===== SOUTH SUDAN =====
    {
      name: "Guru Brothers Ltd",
      description: "South Sudan-based company offering software development, data analytics, cybersecurity services, along with general merchandise, construction materials, and transportation solutions.",
      github: null,
      liveUrl: "https://gurubrothersltd.com",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgurubrothersltd.com?w=600&h=400",
      language: "TypeScript",
      category: "SMEs",
      country: "South Sudan",
      icon: Briefcase,
      features: ["Software Development", "Data Analytics", "General Supplies", "Logistics"],
      year: "2025"
    },

    // ===== AUSTRALIA =====
    {
      name: "Ausiken Co-operative",
      description: "Australian cooperative organization providing community-focused services and support for members, fostering growth and collaboration.",
      github: null,
      liveUrl: "https://ausiken.com.au",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fausiken.com.au?w=600&h=400",
      language: "TypeScript",
      category: "SMEs",
      country: "Australia",
      icon: Users,
      features: ["Cooperative Services", "Community Support", "Member Benefits", "Collaboration"],
      year: "2025"
    },

    // ===== LEGAL =====
    {
      name: "FNM Law Advocates",
      description: "Full-service law firm providing comprehensive legal solutions in real estate, intellectual property, corporate law, litigation, debt recovery, and notary services in Nairobi, Kenya.",
      github: null,
      liveUrl: "https://fnmlawadvocates.com",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ffnmlawadvocates.com?w=600&h=400",
      language: "TypeScript",
      category: "Legal",
      country: "Kenya",
      icon: Gavel,
      features: ["Corporate Law", "Real Estate", "IP Law", "Litigation"],
      year: "2025"
    },
    {
      name: "KE Law (Kimani & Muriithi)",
      description: "Law firm offering advocacy services as Advocates, Commissioners of Oath, and Notaries Public, providing comprehensive legal representation in Kenya.",
      github: null,
      liveUrl: "https://kelaw.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkelaw.co.ke?w=600&h=400",
      language: "TypeScript",
      category: "Legal",
      country: "Kenya",
      icon: Scale,
      features: ["Advocacy", "Notary Services", "Legal Representation", "Commissioner of Oath"],
      year: "2025"
    },
    {
      name: "K. Mwaura & Co. Advocates",
      description: "Established law firm (since 1975) specializing in corporate & commercial law, conveyancing, compliance audits, banking & insurance law, and civil litigation with debt recovery.",
      github: null,
      liveUrl: "https://kmwauraadvocates.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkmwauraadvocates.co.ke?w=600&h=400",
      language: "Laravel",
      category: "Legal",
      country: "Kenya",
      icon: Gavel,
      features: ["Corporate Law", "Conveyancing", "Banking Law", "Litigation"],
      year: "2025"
    },
    {
      name: "FNM Law Advocates LLP",
      description: "Professional law firm website featuring practice area showcases, attorney profiles, and client consultation booking system.",
      github: "https://github.com/lewisgithinji/fnmlaw",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Legal",
      country: "Kenya",
      icon: Scale,
      features: ["Practice Areas", "Attorney Profiles", "Consultation Booking", "Legal Resources"],
      year: "2025"
    },

    // ===== BANKING & FINANCE =====
    {
      name: "TNT Sacco",
      description: "Comprehensive financial platform for a Kenyan Savings and Credit Cooperative Organization, featuring member management, loan processing, and financial reporting.",
      github: "https://github.com/lewisgithinji/tnt-sacco",
      liveUrl: "https://tntsacco.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftntsacco.co.ke?w=600&h=400",
      language: "TypeScript",
      category: "Banking & Finance",
      country: "Kenya",
      icon: Landmark,
      features: ["Member Portal", "Loan Management", "Financial Reports", "Savings"],
      year: "2025"
    },
    {
      name: "Assets Global Hub",
      description: "Centralized hub for global asset management offering real-time tracking, portfolio management, and investment insights for financial organizations.",
      github: "https://github.com/lewisgithinji/assets-global-hub",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Banking & Finance",
      country: "Kenya",
      icon: BarChart3,
      features: ["Portfolio Management", "Asset Tracking", "Investment Insights", "Analytics"],
      year: "2025"
    },
    {
      name: "Information Assets World",
      description: "Global information assets platform providing comprehensive data management, asset tracking, and business intelligence solutions for enterprises.",
      github: "https://github.com/lewisgithinji/Information-Assets-World",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Banking & Finance",
      country: "Kenya",
      icon: Database,
      features: ["Data Management", "Asset Tracking", "Business Intelligence", "Analytics"],
      year: "2025"
    },
    {
      name: "Assets Information Hub",
      description: "Comprehensive asset management and information portal providing insights, tracking, and reporting capabilities for organizational assets.",
      github: "https://github.com/lewisgithinji/Assets-information-hub",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Banking & Finance",
      country: "Kenya",
      icon: Building,
      features: ["Asset Tracking", "Information Management", "Reporting", "Data Analytics"],
      year: "2025"
    },

    // ===== EDUCATION =====
    {
      name: "IJSSE Conferences",
      description: "IJSSE Academic Journals Platform with comprehensive conferences page featuring calendar view, filtering, search functionality, and academic event management.",
      github: "https://github.com/lewisgithinji/ijsse-conferences",
      liveUrl: null,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      language: "TypeScript",
      category: "Education",
      country: "Kenya",
      icon: GraduationCap,
      features: ["Conference Calendar", "Search & Filtering", "Academic Journals", "Event Management"],
      year: "2025"
    },

    // ===== MANUFACTURING =====
    {
      name: "PSML (Palak Steel Mill)",
      description: "Steel manufacturing company specializing in TMT reinforcement bars and merchant bars for residential, commercial, industrial, and civil infrastructure construction projects in Kenya.",
      github: null,
      liveUrl: "https://psml.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpsml.ke?w=600&h=400",
      language: "WordPress",
      category: "Manufacturing",
      country: "Kenya",
      icon: Factory,
      features: ["Steel Production", "TMT Bars", "Construction Materials", "Infrastructure"],
      year: "2025"
    },
    {
      name: "MBA Construction",
      description: "Construction services company offering general construction, virtual design/build, property development, preconstruction, and project management across Kenya, Tanzania, Ghana, and India.",
      github: null,
      liveUrl: "https://mbaconstruction.co.ke",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmbaconstruction.co.ke?w=600&h=400",
      language: "WordPress",
      category: "Manufacturing",
      country: "Kenya",
      icon: HardHat,
      features: ["Construction", "Property Development", "Project Management", "Design Build"],
      year: "2025"
    }
  ];

  // Industries - updated with IT, Energy categories
  const industries = ["All", "IT", "SMEs", "Legal", "Banking & Finance", "Healthcare", "Education", "Manufacturing", "Energy", "NGOs", "Government"];

  // Countries
  const countries = ["All", "Kenya", "South Sudan", "Australia"];

  // Only show industries that have projects
  const categoriesWithProjects = industries.filter(cat =>
    cat === "All" || projects.some(p => p.category === cat)
  );

  // Only show countries that have projects
  const countriesWithProjects = countries.filter(country =>
    country === "All" || projects.some(p => p.country === country)
  );

  const filteredProjects = projects.filter(p => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const countryMatch = selectedCountry === "All" || p.country === selectedCountry;
    return categoryMatch && countryMatch;
  });

  const stats = [
    { label: "Projects Completed", value: `${projects.length}+`, icon: Folder },
    { label: "Technologies Used", value: "10+", icon: Code },
    { label: "Industries Served", value: `${categoriesWithProjects.length - 1}`, icon: Globe },
    { label: "Live Websites", value: `${projects.filter(p => p.liveUrl).length}`, icon: ExternalLink }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Portfolio - Web Development Projects & Digital Solutions"
        description="Explore Datacare Limited's portfolio of web applications and digital solutions across IT, Legal, Banking, Healthcare, Education, and Manufacturing industries in Kenya, South Sudan, and Australia."
        keywords="web development portfolio Kenya, IT projects, digital solutions, React projects, WordPress development, Laravel development, Kenya web design"
        url="https://datacare.co.ke/portfolio"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Projects & Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our collection of web applications and digital solutions built with modern
              technologies. Each project represents our commitment to quality, innovation, and
              client success.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A showcase of web applications and digital solutions across various industries.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-10 space-y-6">
            {/* Industry Filter */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by Industry:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categoriesWithProjects.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-primary" : ""}
                  >
                    {category}
                    {category !== "All" && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {projects.filter(p => p.category === category).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by Country:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {countriesWithProjects.map((country) => (
                  <Button
                    key={country}
                    variant={selectedCountry === country ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCountry(country)}
                    className={selectedCountry === country ? "btn-primary" : ""}
                  >
                    {country}
                    {country !== "All" && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {projects.filter(p => p.country === country).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Count */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-primary">{filteredProjects.length}</span> projects
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedCountry !== "All" && ` from ${selectedCountry}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.name}
                  className="card-elevated group cursor-pointer hover:border-primary/30 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = '1';
                        }}
                        style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      {project.liveUrl && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                          Live
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        {!project.image && project.liveUrl && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            Live
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.country}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Tech & Year */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      {project.language}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {project.year}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 btn-outline"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className={`flex-1 btn-primary ${!project.github ? 'w-full' : ''}`}
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technologies <span className="gradient-text">We Use</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our projects are built using modern, industry-standard technologies
              that ensure scalability, performance, and maintainability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
              { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
              { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
              { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
              { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
              { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
              { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
              { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
              { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
              { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
              { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
              { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
              { name: "Shadcn UI", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" }
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="card-elevated text-center py-4 group hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-10 h-10 mx-auto mb-2 group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We'd love to help bring your ideas to life. Get in touch to discuss
            your next web application or digital solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary" onClick={() => window.location.href = '/contact'}>
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-outline"
              onClick={() => window.open('https://github.com/lewisgithinji', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub Profile
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
