import {
  FaChartLine,
  FaBell,
  FaMoneyBillWave,
  FaMobile,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <FaChartLine className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SubTrack
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
              <Link
                to="#features"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Take control of your</span>
                  <span className="block text-blue-600">subscriptions</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Track, manage, and optimize all your subscriptions in one
                  place. Never pay for unused services again.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Get started for free
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Explore Features
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Subscription management dashboard"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Better way to track subscriptions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Everything you need to manage your subscriptions effectively
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="mt-10 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-lg shadow-md ${plan.featured ? "bg-white ring-2 ring-blue-500" : "bg-white"}`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-3 text-base text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">
              Start tracking your subscriptions today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="#pricing"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            <div className="px-5 py-2">
              <Link
                to="/about"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="#features"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="#pricing"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Pricing
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/privacy"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Privacy
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/terms"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Terms
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} SubTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    name: "Centralized Tracking",
    description:
      "View all your subscriptions in one dashboard with clear spending insights.",
    icon: FaChartLine,
  },
  {
    name: "Renewal Alerts",
    description:
      "Get notified before subscriptions renew so you can cancel unwanted services.",
    icon: FaBell,
  },
  {
    name: "Cost Analysis",
    description:
      "See monthly and yearly spending breakdowns to identify savings opportunities.",
    icon: FaMoneyBillWave,
  },
  {
    name: "Mobile Friendly",
    description:
      "Access your subscription data anywhere with our responsive design.",
    icon: FaMobile,
  },
  {
    name: "Secure Data",
    description: "Your financial information is encrypted and protected.",
    icon: FaShieldAlt,
  },
  {
    name: "Easy Cancellation",
    description: "Quick links to cancel services directly from our platform.",
    icon: FaMoneyBillWave,
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    description:
      "Perfect for individuals getting started with subscription tracking.",
    features: [
      "Track up to 5 subscriptions",
      "Basic analytics",
      "Email reminders",
      "Mobile access",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "5",
    description: "For power users who need advanced tracking and insights.",
    features: [
      "Unlimited subscriptions",
      "Advanced analytics",
      "Email & SMS reminders",
      "Priority support",
      "Export to CSV",
      "Annual spending reports",
    ],
    featured: true,
  },
  {
    name: "Business",
    price: "15",
    description: "For teams and businesses managing multiple subscriptions.",
    features: [
      "Everything in Pro",
      "Team members (up to 5)",
      "Shared dashboards",
      "Custom reporting",
      "Dedicated account manager",
      "API access",
    ],
    featured: false,
  },
];

export default LandingPage;
