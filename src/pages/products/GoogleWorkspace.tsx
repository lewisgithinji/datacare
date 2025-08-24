import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building, Users, CheckCircle, Star, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const GoogleWorkspace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Building className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Google Workspace</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Collaborative productivity platform with Gmail, Drive, Meet, and advanced AI features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Consultation</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Plans</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Certified Google Partner</h2>
            <p className="text-lg text-muted-foreground">Expert deployment and management of Google Workspace solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">800+</div>
              <div className="text-muted-foreground">Users Migrated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-muted-foreground">Uptime Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12h</div>
              <div className="text-muted-foreground">Migration Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Modern Collaboration Platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Google Meet</h3>
              <p className="text-muted-foreground">HD video conferencing with up to 500 participants</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gmail & Calendar</h3>
              <p className="text-muted-foreground">Professional email with smart scheduling</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Google Drive</h3>
              <p className="text-muted-foreground">Secure cloud storage with real-time collaboration</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Tools</h3>
              <p className="text-muted-foreground">Smart Compose, Voice typing, and more</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Google Workspace Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Business Starter</h3>
              <div className="text-4xl font-bold text-primary mb-2">$6<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Gmail and Calendar</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />30GB cloud storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Google Meet (100 participants)</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated border-2 border-primary">
              <h3 className="text-2xl font-bold mb-2">Business Standard</h3>
              <div className="text-4xl font-bold text-primary mb-2">$12<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Starter</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />2TB cloud storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Google Meet (150 participants)</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Security and admin controls</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Business Plus</h3>
              <div className="text-4xl font-bold text-primary mb-2">$18<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Standard</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />5TB cloud storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced security features</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Sticky Action */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg">
          <HeadphonesIcon className="w-6 h-6" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default GoogleWorkspace;