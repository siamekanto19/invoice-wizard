import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Plus,
  Download,
  Eye,
  Sparkles,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Building,
  Calculator,
  Globe,
  Smartphone,
  Palette,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/25 animate-in zoom-in duration-700">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <Badge
              variant="secondary"
              className="mb-6 text-sm px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/50 animate-in fade-in slide-in-from-top duration-500 delay-200"
            >
              <Zap className="h-3 w-3 mr-1" />
              Professional Invoice Generator
            </Badge>

            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              Create Stunning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Invoices
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              Transform your billing process with our modern, intuitive invoice
              generator. Create professional invoices in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-700">
              <Link href="/generate">
                <Button
                  size="lg"
                  className="group text-lg px-10 py-6 h-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Create New Invoice
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-slate-600">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">
                  Free to use • No signup required
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 rounded-3xl hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-left duration-700 delay-500">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Professional Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-600 leading-relaxed">
                  Beautiful, modern invoice templates that make your business
                  stand out and look professional
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 rounded-3xl hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom duration-700 delay-600">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Instant PDF Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-600 leading-relaxed">
                  Generate and download professional PDF invoices instantly with
                  perfect formatting every time
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 rounded-3xl hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-right duration-700 delay-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-600 leading-relaxed">
                  See exactly how your invoice will look with real-time preview
                  before downloading
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 animate-in fade-in slide-in-from-bottom duration-700 delay-800">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm text-slate-600 font-medium">
                Free to Use
              </div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 animate-in fade-in slide-in-from-bottom duration-700 delay-900">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                2min
              </div>
              <div className="text-sm text-slate-600 font-medium">
                Average Creation
              </div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-sm text-slate-600 font-medium">
                Beautiful Templates
              </div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 animate-in fade-in slide-in-from-bottom duration-700 delay-1100">
              <div className="text-3xl font-bold text-orange-600 mb-2">PDF</div>
              <div className="text-sm text-slate-600 font-medium">
                Instant Export
              </div>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-900/10 rounded-3xl mb-20 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700 delay-1200">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="text-3xl text-slate-900 mb-2">
                  Powerful Features
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Everything you need to create professional invoices
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900">
                        Comprehensive Business Details
                      </h3>
                    </div>
                    <ul className="space-y-3 text-slate-600 ml-13">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Company and client information management</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>
                          Multiple line items with automatic calculations
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>
                          Tax and discount support with real-time totals
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Flexible payment terms and methods</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Banking details with SWIFT code support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900">
                        Modern User Experience
                      </h3>
                    </div>
                    <ul className="space-y-3 text-slate-600 ml-13">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Intuitive, card-based interface design</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Real-time form validation and feedback</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>
                          Automatic data persistence and progress tracking
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Fully responsive, mobile-optimized design</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>
                          Professional PDF export with multiple templates
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Template Showcase */}
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-700 delay-1300">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose Your Style
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Select from our carefully crafted invoice templates designed for
              different business needs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">
                    Professional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    Clean, corporate design perfect for business-to-business
                    transactions
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">
                    Minimal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    Simple, elegant design that focuses on clarity and
                    readability
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">
                    Elegant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    Sophisticated design with refined typography and spacing
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 border border-white/50 animate-in fade-in slide-in-from-bottom duration-700 delay-1400">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
              <Zap className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Create Your First Invoice?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust our invoice generator
              for their billing needs. Start creating beautiful invoices today –
              it's completely free!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate">
                <Button
                  variant="default"
                  size="lg"
                  className="group text-lg px-10 py-6 h-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                >
                  <Clock className="mr-3 h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>

              <div className="flex items-center gap-4 text-slate-600">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">
                    No signup required
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Works offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
