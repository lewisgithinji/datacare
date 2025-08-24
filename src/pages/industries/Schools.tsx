import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GraduationCap, Users, CheckCircle, BookOpen, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Schools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Education Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Technology solutions to enhance learning and streamline school operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Education Demo</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Education Packages</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Educational Technology Challenges We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Learning</h3>
              <p className="text-muted-foreground">Enable remote and hybrid learning with cloud-based collaboration tools</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Parent Communication</h3>
              <p className="text-muted-foreground">Streamline communication between teachers, students, and parents</p>
            </Card>
            <Card className="p-6 card-elevated">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Administrative Efficiency</h3>
              <p className="text-muted-foreground">Automate administrative tasks and improve operational efficiency</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Solutions for Schools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/cloud-and-licensing" className="text-primary hover:underline">
                  Education Cloud Platform
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Microsoft 365 Education with specialized tools for learning and administration
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Microsoft Teams for Education</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />OneNote Class Notebooks</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />SharePoint for document management</li>
              </ul>
              <Link to="/solutions/cloud-and-licensing">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/ai-and-messaging-automation" className="text-primary hover:underline">
                  Parent Communication System
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Automated messaging system for parent updates, fee reminders, and emergency notifications
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Automated fee reminders</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Academic progress updates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Emergency notifications</li>
              </ul>
              <Link to="/solutions/ai-and-messaging-automation">
                <Button>Get Demo</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Essential Products for Schools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/microsoft-365" className="text-primary hover:underline">
                  Microsoft 365 Education
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive education platform with special pricing for schools
              </p>
              <Link to="/products/microsoft-365">
                <Button variant="outline">View Education Plans</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/datacare-messaging-platform" className="text-primary hover:underline">
                  School Communication Platform
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                WhatsApp-based communication system for schools and parents
              </p>
              <Link to="/products/datacare-messaging-platform">
                <Button variant="outline">Request Demo</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Benefits for Educational Institutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Enhanced Learning</div>
              <div className="text-muted-foreground">Interactive digital tools improve student engagement</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Better Communication</div>
              <div className="text-muted-foreground">Streamlined parent-teacher communication</div>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Cost Savings</div>
              <div className="text-muted-foreground">Reduced administrative overhead and paper usage</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Modernize Your Educational Institution</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Discover how technology can enhance learning outcomes and operational efficiency
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Schedule Education Demo
            </Button>
          </Link>
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

export default Schools;