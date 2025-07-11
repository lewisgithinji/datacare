import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Users, 
  Target, 
  Award, 
  MapPin, 
  Calendar,
  TrendingUp,
  Shield,
  Brain,
  Globe,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Heart,
  Zap,
  Eye,
  Handshake,
  Star,
  Building,
  Phone,
  Mail,
  Clock,
  Cpu,
  Network
} from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2012",
      title: "Company Founded",
      description: "Datacare Limited established in Nairobi, Kenya with a vision to transform African IT infrastructure."
    },
    {
      year: "2015",
      title: "First 100 Clients",
      description: "Reached our first major milestone, serving over 100 organizations across East Africa."
    },
    {
      year: "2018",
      title: "AI Integration Pioneer",
      description: "Became first Kenyan IT company to integrate AI-powered predictive analytics into all service offerings."
    },
    {
      year: "2020",
      title: "Pandemic Response",
      description: "Rapidly deployed remote work solutions for 200+ organizations during COVID-19 lockdowns."
    },
    {
      year: "2022",
      title: "Regional Expansion",
      description: "Extended operations to Uganda and Tanzania, establishing Datacare as a regional leader."
    },
    {
      year: "2024",
      title: "500+ Organizations",
      description: "Proudly serving over 500 organizations with cutting-edge AI-integrated IT solutions."
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We continuously embrace emerging technologies and innovative approaches to solve complex IT challenges."
    },
    {
      icon: Shield,
      title: "Security by Design",
      description: "Every solution we deploy prioritizes security, ensuring your data and systems remain protected."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Our success is measured by the success of our clients. We build lasting partnerships, not just transactions."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We believe in open communication, clear reporting, and honest relationships with all stakeholders."
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "We invest in our team's development and cutting-edge technologies to stay ahead of industry trends."
    },
    {
      icon: Handshake,
      title: "Local Impact",
      description: "Committed to advancing Africa's digital transformation while creating opportunities for local talent."
    }
  ];

  const leadership = [
    {
      name: "Dr. James Kamau",
      position: "Chief Executive Officer",
      bio: "15+ years leading digital transformation initiatives across Africa. Former IBM East Africa Director.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/jameskamau"
    },
    {
      name: "Sarah Muthoni",
      position: "Chief Technology Officer",
      bio: "AI and machine learning expert with 12+ years experience. MIT graduate specializing in enterprise AI solutions.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/sarahmuthoni"
    },
    {
      name: "Michael Odhiambo",
      position: "Chief Security Officer",
      bio: "Cybersecurity veteran with expertise in AI-powered threat detection. Former Safaricom Security Division Head.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/michaelodhiambo"
    },
    {
      name: "Grace Wanjiku",
      position: "Chief Operations Officer",
      bio: "Operations excellence expert focused on scalable service delivery. 10+ years in enterprise IT operations.",
      image: "https://images.unsplash.com/photo-1559941338-fd4d06aa2d25?w=200&h=200&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/gracewanjiku"
    }
  ];

  const certifications = [
    {
      name: "ISO 27001",
      description: "Information Security Management",
      icon: Shield
    },
    {
      name: "AWS Advanced Partner",
      description: "Cloud Solutions Provider",
      icon: Globe
    },
    {
      name: "Microsoft Gold Partner",
      description: "Enterprise Solutions",
      icon: Award
    },
    {
      name: "Cisco Premier Partner",
      description: "Network Infrastructure",
      icon: Network
    },
    {
      name: "VMware Enterprise Partner",
      description: "Virtualization Solutions",
      icon: Cpu
    },
    {
      name: "PCI DSS Compliant",
      description: "Payment Card Industry Security",
      icon: CheckCircle
    }
  ];

  const offices = [
    {
      city: "Nairobi",
      country: "Kenya",
      address: "Westlands Business District, Ring Road Parklands",
      phone: "+254 (0) 20 123 4567",
      email: "nairobi@datacare.co.ke",
      isHeadquarters: true
    },
    {
      city: "Kampala",
      country: "Uganda",
      address: "Nakasero Business District, Parliament Avenue",
      phone: "+256 (0) 41 123 456",
      email: "kampala@datacare.co.ke",
      isHeadquarters: false
    },
    {
      city: "Dar es Salaam",
      country: "Tanzania",
      address: "Masaki Business District, Haile Selassie Road",
      phone: "+255 (0) 22 123 456",
      email: "dar@datacare.co.ke",
      isHeadquarters: false
    }
  ];

  const stats = [
    { label: "Years of Excellence", value: "12+", icon: Calendar },
    { label: "Organizations Served", value: "500+", icon: Building },
    { label: "Team Members", value: "150+", icon: Users },
    { label: "Countries", value: "3", icon: Globe },
    { label: "AI Models Deployed", value: "50+", icon: Brain },
    { label: "Uptime SLA", value: "99.9%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">About Datacare</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Transforming Africa's</span><br />
              Digital Future
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Since 2012, we've been at the forefront of East Africa's digital transformation, 
              empowering organizations with AI-integrated IT solutions that drive innovation, 
              security, and growth across the continent.
            </p>
            
            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
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

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To democratize access to world-class IT solutions across Africa by leveraging 
                artificial intelligence, innovative technologies, and deep local expertise. 
                We empower organizations to achieve digital excellence while contributing to 
                sustainable economic growth across the continent.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Vision</h3>
                    <p className="text-muted-foreground">
                      To be Africa's leading AI-integrated IT solutions provider, 
                      setting global standards for innovation and service excellence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-accent mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Purpose</h3>
                    <p className="text-muted-foreground">
                      Bridging the digital divide through accessible, secure, and 
                      intelligent technology solutions that transform businesses and communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-[var(--shadow-strong)] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small Nairobi startup to a regional leader in AI-integrated IT solutions, 
              discover the milestones that have shaped our growth and impact.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-accent h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-elevated">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do, from client relationships 
              to innovation and community impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="card-elevated text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the visionary leaders driving innovation and excellence across 
              our organization and the broader African tech ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={leader.name}
                className="card-elevated text-center group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {leader.name}
                </h3>
                <div className="text-sm text-primary font-medium mb-4">{leader.position}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {leader.bio}
                </p>
                <Button variant="outline" size="sm" className="btn-outline">
                  LinkedIn Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Certifications & <span className="gradient-text">Partnerships</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence is validated by industry-leading certifications 
              and strategic partnerships with global technology leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.name}
                  className="card-elevated flex items-center space-x-4 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-success to-success-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-success transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{cert.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Locations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategically positioned across East Africa to serve our clients 
              with local expertise and regional reach.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div
                key={office.city}
                className={`card-elevated relative ${office.isHeadquarters ? 'ring-2 ring-primary/20' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {office.isHeadquarters && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Headquarters
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{office.city}</h3>
                    <p className="text-muted-foreground">{office.country}</p>
                  </div>
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Building className="w-4 h-4 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're looking to transform your organization with AI-powered solutions 
            or join our team of innovators, we'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-primary">
              Explore Career Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Get in Touch
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Great Place to Work Certified
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Top Employer East Africa
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Always Growing, Always Learning
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;