// import { useState, useEffect } from "react";
// import { useRef } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import bgImg from "@/assets/static/bg-image.png";
// import feature1Img from "@/assets/static/feature1.png";
// import feature2Img from "@/assets/static/feature2.jpg";
// import feature3Img from "@/assets/static/feature3.png";
// import feature4Img from "@/assets/static/feature4.jpg";
// import promo from "@/assets/static/promovid.mp4";
// import { motion, useAnimation, useInView } from "framer-motion";
// import Lottie from "lottie-react";
// import docbot from "@/assets/static/Doctor.json";
// import docRegisterAnimation from "@/assets/static/docRegister.json";

// import {
//   FaRegHandPaper,
//   FaMoon,
//   FaSun,
//   FaTimes,
//   FaUserMd,
//   FaStethoscope,
//   FaHeartbeat,
//   FaBriefcaseMedical,
//   FaStar,
//   FaCheckCircle,
//   FaUserShield,
//   FaUserTie
// } from "react-icons/fa";

// export default function LandingPage() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [showDoctorPopup, setShowDoctorPopup] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);

//   const messages = [
//     "Hi, I'm Curomate",
//     "I help you with smart solutions",
//     "Let's make your day productive!",
//     "Ready to explore?",
//   ];

//   const [msgIndex, setMsgIndex] = useState(0);

//   // Debug effect
//   useEffect(() => {
//     console.log("Current dark mode state:", isDarkMode);
//     console.log("HTML classes:", document.documentElement.classList);
//     console.log("Local storage theme:", localStorage.getItem("theme"));
//   }, [isDarkMode]);

//   // Initialize dark mode
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");

//     if (savedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Show doctor popup after 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPopupVisible(true);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   const toggleDarkMode = () => {
//     console.log("Toggle clicked, current mode:", isDarkMode);

//     if (isDarkMode) {
//       // Switching to light mode
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       console.log("Switched to light mode");
//     } else {
//       // Switching to dark mode
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       console.log("Switched to dark mode");
//     }
//   };

//   // Add video handler functions
//   const openVideo = () => {
//     setShowVideo(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeVideo = () => {
//     setShowVideo(false);
//     document.body.style.overflow = "unset";
//   };

//   // Close video on escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape" && showVideo) {
//         closeVideo();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [showVideo]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMsgIndex((prev) => (prev + 1) % messages.length);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const medicationRef = useRef(null);
//   const appointmentsRef = useRef(null);
//   const trackerRef = useRef(null);
//   const additionalRef = useRef(null);

//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Benefits list for doctor registration
//   const doctorBenefits = [
//     { icon: <FaBriefcaseMedical />, text: "Expand Your Practice" },
//     { icon: <FaHeartbeat />, text: "Connect with Patients" },
//     { icon: <FaStethoscope />, text: "Flexible Appointments" },
//     { icon: <FaStar />, text: "Build Your Reputation" },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
//       {/* Doctor Registration Popup */}
//       {popupVisible && !showDoctorPopup && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ type: "spring", damping: 20 }}
//           className="fixed bottom-6 right-6 z-50 max-w-sm"
//         >
//           <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-[#293379]/30 dark:border-blue-600/30 shadow-2xl rounded-2xl overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#293379] to-[#016b61]"></div>

//             <CardContent className="p-6">
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-gradient-to-br from-[#293379] to-[#3a4a9c] rounded-full">
//                   <FaUserMd className="h-8 w-8 text-white" />
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-[#293379] dark:text-white mb-2">
//                     Are You a Medical Professional? 🩺
//                   </h3>
//                   <p className="text-gray-700 dark:text-gray-300 mb-4">
//                     Join thousands of doctors already transforming healthcare on
//                     Cureon. Grow your practice with our smart platform.
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {doctorBenefits.slice(0, 2).map((benefit, idx) => (
//                       <span
//                         key={idx}
//                         className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100/70 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
//                       >
//                         {benefit.icon}
//                         {benefit.text}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex gap-3">
//                     <Button
//                       onClick={() => setShowDoctorPopup(true)}
//                       className="flex-1 bg-gradient-to-r from-[#293379] to-[#3a4a9c] hover:from-[#3a4a9c] hover:to-[#293379] text-white font-semibold"
//                     >
//                       <FaStethoscope className="mr-2" />
//                       Register Now
//                     </Button>

//                     <Button
//                       onClick={() => setPopupVisible(false)}
//                       variant="ghost"
//                       className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                     >
//                       Maybe Later
//                     </Button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setPopupVisible(false)}
//                   className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//                 >
//                   <FaTimes className="h-5 w-5" />
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}
//       {/* Doctor Registration Dialog */}
//       <Dialog open={showDoctorPopup} onOpenChange={setShowDoctorPopup}>
//         <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#293379] via-[#016b61] to-[#fa003f]"></div>

//           <DialogHeader className="pt-4">
//             <div className="flex items-center justify-center gap-3 mb-2">
//               <div className="p-2 bg-gradient-to-br from-[#293379] to-[#3a4a9c] rounded-full">
//                 <FaUserMd className="h-6 w-6 text-white" />
//               </div>
//               <DialogTitle className="text-2xl font-bold text-[#293379] dark:text-white">
//                 For Medical Professionals
//               </DialogTitle>
//             </div>
//             <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-300">
//               Join our network and revolutionize healthcare delivery
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-2">
//             {/* Compact Animation */}
//             <div className="flex justify-center">
//               <div className="h-32 w-32">
//                 <Lottie
//                   animationData={docRegisterAnimation}
//                   loop={true}
//                   autoplay={true}
//                   className="h-full"
//                 />
//               </div>
//             </div>

//             {/* Key Benefits in Compact Grid */}
//             <div className="space-y-3">
//               <h3 className="font-semibold text-[#293379] dark:text-white text-center">
//                 Why Join Cureon? 🌟
//               </h3>

//               <div className="grid grid-cols-2 gap-2">
//                 {doctorBenefits.map((benefit, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-blue-100 dark:border-gray-700"
//                   >
//                     <div className="text-[#293379] dark:text-blue-400">
//                       {benefit.icon}
//                     </div>
//                     <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
//                       {benefit.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Key Features List */}
//             <div className="space-y-2">
//               {[
//                 {
//                   title: "Verified Professional Network",
//                   desc: "Exclusive community of certified professionals",
//                 },
//                 {
//                   title: "Smart Appointment Management",
//                   desc: "AI-powered scheduling tools",
//                 },
//                 {
//                   title: "Practice Growth",
//                   desc: "Reach more patients online",
//                 },
//               ].map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-2">
//                   <FaCheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                       {feature.title}
//                     </h4>
//                     <p className="text-xs text-gray-600 dark:text-gray-400">
//                       {feature.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Special Offer */}
//             <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 bg-amber-100 dark:bg-amber-900/50 rounded-full">
//                   <FaStar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
//                 </div>
//                 <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
//                   <span className="font-bold">Limited Offer:</span> First 100
//                   doctors get 3 months FREE!
//                 </p>
//               </div>
//             </div>
//           </div>

//           <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <Button
//               onClick={() => setShowDoctorPopup(false)}
//               variant="outline"
//               size="sm"
//               className="flex-1 h-10 text-sm"
//             >
//               Later
//             </Button>

//             <Link to="/doctor-register" className="flex-1">
//               <Button
//                 className="w-full h-10 text-sm bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#018377] text-white font-semibold"
//                 onClick={() => setShowDoctorPopup(false)}
//               >
//                 <FaUserMd className="mr-2 h-3 w-3" />
//                 Start Registration
//               </Button>
//             </Link>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Video Modal */}
//       {showVideo && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
//           onClick={closeVideo}
//         >
//           <div
//             className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={closeVideo}
//               className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-2"
//             >
//               <FaTimes className="h-8 w-6" />
//             </button>

//             {/* Video Player */}
//             <video
//               className="w-full h-full object-contain rounded-lg"
//               controls
//               autoPlay
//               muted
//             >
//               <source src={promo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       )}

//       {/* Rest of your existing code remains the same */}
//       {!showVideo && (
//         <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md sticky top-0 z-50 shadow-xl transition-colors">
//           {/* Logo */}
//           <div className="flex justify-between w-full sm:w-auto items-center mb-4 sm:mb-0">
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293379] dark:text-blue-300 tracking-wide hover:cursor-default">
//               Cureon
//             </h1>

//             {/* Mobile Menu Toggle - Only visible on small screens */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild className="sm:hidden">
//                 <Button variant="ghost" size="icon" className="w-10 h-10">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     className="h-6 w-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="sm:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 dark:border-gray-700 shadow-2xl rounded-xl p-2 w-48">
//                 {/* Mobile Home Link */}
//                 <DropdownMenuItem className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer">
//                   <Link to="/" className="w-full">
//                     Home
//                   </Link>
//                 </DropdownMenuItem>

//                 {/* Mobile Explore Items */}
//                 {[
//                   { title: "Quick Consultations", ref: medicationRef },
//                   {
//                     title: "Instant Doctor Appointments",
//                     ref: appointmentsRef,
//                   },
//                   { title: "Medication Reminders", ref: trackerRef },
//                   { title: "Additional Features", ref: additionalRef },
//                 ].map((item, idx) => (
//                   <DropdownMenuItem
//                     key={idx}
//                     className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer"
//                     onClick={() => scrollToSection(item.ref)}
//                   >
//                     {item.title}
//                   </DropdownMenuItem>
//                 ))}

//                 {/* Mobile For Doctors Button */}
//                 <DropdownMenuItem className="rounded-lg">
//                   <Button
//                     onClick={() => setShowDoctorPopup(true)}
//                     variant="outline"
//                     className="w-full rounded-full border-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-bold text-sm"
//                   >
//                     <FaUserMd className="mr-2 h-3 w-3" />
//                     For Doctors
//                   </Button>
//                 </DropdownMenuItem>

//                 {/* Mobile Admin Button */}
//                 <DropdownMenuItem className="rounded-lg">
//                   <Link to="/admin-register" className="w-full">
//                     <Button
//                       variant="ghost"
//                       className="w-full justify-start rounded-lg text-[#6a11cb] dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-sm"
//                     >
//                       <FaUserTie className="mr-2 h-4 w-4" />
//                       Admin Registration
//                     </Button>
//                   </Link>
//                 </DropdownMenuItem>

//                 {/* Mobile Login Button */}
//                 <DropdownMenuItem className="rounded-lg">
//                   <Link to="/login" className="w-full">
//                     <Button className="w-full bg-[#016b61] dark:bg-[#018377] text-white hover:bg-[#015951] dark:hover:bg-[#016b61] rounded-full text-sm">
//                       Login
//                     </Button>
//                   </Link>
//                 </DropdownMenuItem>

//                 {/* Mobile Dark Mode Toggle */}
//                 <DropdownMenuItem className="rounded-lg">
//                   <button
//                     onClick={toggleDarkMode}
//                     className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//                     aria-label={
//                       isDarkMode
//                         ? "Switch to light mode"
//                         : "Switch to dark mode"
//                     }
//                   >
//                     <span className="text-sm text-gray-700 dark:text-gray-300">
//                       {isDarkMode ? "Light Mode" : "Dark Mode"}
//                     </span>
//                     {isDarkMode ? (
//                       <FaSun className="h-4 w-4 text-yellow-400" />
//                     ) : (
//                       <FaMoon className="h-4 w-4 text-[#293379]" />
//                     )}
//                   </button>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Desktop Nav Links - Hidden on mobile */}
//           <div className="hidden sm:flex items-center gap-3 lg:gap-4">
//             <Link
//               to="/"
//               className="font-medium text-[#293379] dark:text-blue-200 hover:text-[#fa003f] dark:hover:text-blue-100 transition-all duration-300 text-sm lg:text-base"
//             >
//               Home
//             </Link>

//             {/* Explore Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="bg-[#293379] dark:bg-blue-700 text-white font-semibold px-4 lg:px-5 py-2 rounded-full shadow-md hover:bg-[#3a4a9c] dark:hover:bg-blue-600 transition-all duration-300 text-sm lg:text-base">
//                   Explore
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 dark:border-gray-700 shadow-2xl rounded-xl p-2 w-48 lg:w-60">
//                 {[
//                   { title: "Quick Consultations", ref: medicationRef },
//                   {
//                     title: "Instant Doctor Appointments",
//                     ref: appointmentsRef,
//                   },
//                   { title: "Medication Reminders", ref: trackerRef },
//                   { title: "Additional Features", ref: additionalRef },
//                 ].map((item, idx) => (
//                   <DropdownMenuItem
//                     key={idx}
//                     className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer text-sm lg:text-base"
//                     onClick={() => scrollToSection(item.ref)}
//                   >
//                     {item.title}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Doctor Registration Button in Nav */}
//             <Button
//               onClick={() => setShowDoctorPopup(true)}
//               variant="outline"
//               className="rounded-full border-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-bold text-sm lg:text-base py-2 px-3 lg:px-4"
//             >
//               <FaUserMd className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
//               <span className="hidden lg:inline">For Doctors</span>
//               <span className="lg:hidden">Doctors</span>
//             </Button>

//             {/* Admin Icon Button */}
//             <Link to="/admin-register">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-gray-300 dark:border-gray-600 text-[#6a11cb] dark:text-purple-400 hover:text-[#7b1fd1] dark:hover:text-purple-300 transition-all duration-300"
//                 title="Admin Registration"
//               >
//                 <FaUserTie className="h-4 w-4 lg:h-5 lg:w-5" />
//               </Button>
//             </Link>

//             {/* Login Button */}
//             <Link to="/login">
//               <Button className="bg-[#016b61] dark:bg-[#018377] text-white font-semibold px-4 lg:px-5 py-2 rounded-full shadow-md hover:bg-[#015951] dark:hover:bg-[#016b61] transition-all duration-300 text-sm lg:text-base">
//                 <span className="hidden lg:inline">Login</span>
//                 <span className="lg:hidden">Login</span>
//               </Button>
//             </Link>

//             {/* Dark Mode Toggle - Simplified */}
//             <button
//               onClick={toggleDarkMode}
//               className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
//               aria-label={
//                 isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {isDarkMode ? (
//                 <FaSun className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
//               ) : (
//                 <FaMoon className="h-4 w-4 lg:h-5 lg:w-5 text-[#293379]" />
//               )}
//             </button>
//           </div>
//         </nav>
//       )}
//       {/* Body */}
//       <div className="flex flex-col md:flex-row items-center justify-center min-h-[85vh] bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-10 md:px-16 py-10 md:py-0 transition-colors">
//         {/* Left: Hero Text */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-8">
//           <h2 className="text-5xl md:text-6xl font-extrabold text-[#293379] dark:text-white leading-tight">
//             Your Health Companion
//           </h2>
//           <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-lg mx-auto md:mx-0">
//             Track your health, book appointments, and stay in control of your
//             wellness journey — all with a touch of AI care.
//           </p>
//           <div className="flex flex-wrap gap-3">
//             <Button
//               onClick={openVideo}
//               className="px-10 py-4 text-lg bg-[#016b61] dark:bg-[#018377] text-white hover:scale-105 hover:bg-[#015951] dark:hover:bg-[#016b61] transition-all duration-300 shadow-md"
//             >
//               <i className="fa-solid fa-circle-play"></i>
//               &nbsp; Know Us
//             </Button>
//           </div>
//         </div>
//         {/* Right: Curomate Animation */}
//         <div className="w-full md:w-1/2 flex items-center justify-center relative">
//           {/* Speech Bubble */}
//           <div className="absolute top-4 md:top-4 bg-white dark:bg-gray-800 text-[#293379] dark:text-blue-200 px-5 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 animate-bounce">
//             <div className="flex items-center gap-2 leading-none">
//               <FaRegHandPaper className="text-[rgb(30,48,80)] dark:text-blue-200" />
//               <span>
//                 {messages[msgIndex].includes("Curomate") ? (
//                   <>
//                     Hi, I'm{" "}
//                     <span className="font-bold text-[#fa003f] dark:text-red-400">
//                       Curomate
//                     </span>
//                   </>
//                 ) : (
//                   messages[msgIndex]
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* Animation */}
//           <div className="max-w-xs md:max-w-sm lg:max-w-md mt-6 md:mt-10">
//             <Lottie animationData={docbot} loop={true} />
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="py-20 px-6 md:px-32 space-y-24 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
//         <FeatureCard
//           refProp={medicationRef}
//           title="Quick Consultations"
//           text="Get instant consultations with licensed doctors online. Avoid long queues and manage your health efficiently from the comfort of your home."
//           imgSrc={feature1Img}
//           reverse={false}
//         />
//         <FeatureCard
//           refProp={appointmentsRef}
//           title="Instant Doctor Appointments"
//           text="Schedule appointments instantly with verified professionals. Receive notifications and reminders so you never miss a session."
//           imgSrc={feature2Img}
//           reverse={true}
//         />
//         <FeatureCard
//           refProp={trackerRef}
//           title="Medication Reminders"
//           text="Set up personalized medication schedules. Get automatic alerts and track your daily doses to ensure a healthy routine."
//           imgSrc={feature3Img}
//           reverse={false}
//         />
//         <FeatureCard
//           refProp={additionalRef}
//           title="Happy Healthing"
//           text="Monitor your symptoms, track vitals, maintain health logs, and explore extra wellness tools tailored to your needs."
//           imgSrc={feature4Img}
//           reverse={true}
//         />
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#293379] dark:bg-gray-900 backdrop-blur-md text-white/90 p-8 mt-auto shadow-inner transition-colors">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Section — Brand + Motto */}
//           <div>
//             <h2 className="text-xl font-bold mb-2">Cureon</h2>
//             <p className="text-white/70 dark:text-gray-300 text-sm">
//               Empowering your medical health journey with care, technology, and
//               compassion, one step at-a-time.
//             </p>
//             <p className="text-white/60 dark:text-gray-400 text-xs mt-3">
//               Designed with{" "}
//               <i className="fa-solid fa-heart text-[#fa003f] dark:text-red-400"></i>{" "}
//               for your health
//             </p>
//           </div>

//           {/* Right Section — Contact + Socials */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
//             <p className="text-sm text-white/80 dark:text-gray-300">
//               <i className="fa-solid fa-mobile"></i> +91 00000 00000
//             </p>
//             <p className="text-sm text-white/80 dark:text-gray-300">
//               <i className="fa-solid fa-envelope"></i> support@cureon.com
//             </p>
//             <p className="text-sm text-white/80 dark:text-gray-300">
//               <i className="fa-solid fa-location-dot"></i> 123 Health Street,
//               Kolkata, India
//             </p>

//             {/* Social Icons */}
//             <div className="flex justify-center md:justify-start gap-3 mt-3">
//               <a
//                 href="#"
//                 className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300"
//               >
//                 <i className="fa-brands fa-facebook-f"></i>
//               </a>
//               <a
//                 href="#"
//                 className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-black transition-all duration-300"
//               >
//                 <i className="fa-brands fa-x-twitter"></i>
//               </a>
//               <a
//                 href="#"
//                 className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300"
//               >
//                 <i className="fa-brands fa-instagram"></i>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Policy Links Row */}
//         <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 dark:text-gray-300 mt-10">
//           <a
//             href="#"
//             className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
//           >
//             Privacy Policy
//           </a>
//           <a
//             href="#"
//             className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
//           >
//             Terms of Service
//           </a>
//           <a
//             href="#"
//             className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
//           >
//             Cookie Policy
//           </a>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/20 dark:border-gray-600 mt-1 pt-3 text-center text-white/70 dark:text-gray-400 text-xs">
//           &copy; {new Date().getFullYear()}{" "}
//           <span className="font-semibold">Cureon</span>. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

// function FeatureCard({ title, text, imgSrc, reverse = false, refProp }) {
//   const localRef = useRef(null);
//   const controls = useAnimation();

//   useEffect(() => {
//     const node = localRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             controls.start("visible");
//           } else {
//             controls.start("hidden");
//           }
//         });
//       },
//       { threshold: 0.3 },
//     );

//     observer.observe(node);
//     return () => observer.disconnect();
//   }, [controls]);

//   const imageVariants = {
//     hidden: { x: reverse ? 150 : -150, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   const textVariants = {
//     hidden: { x: reverse ? -100 : 100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
//     },
//   };

//   return (
//     <div
//       ref={(node) => {
//         localRef.current = node;
//         if (refProp) refProp.current = node;
//       }}
//       className={`flex flex-col md:flex-row items-center gap-10 p-6 md:p-10 ${
//         reverse ? "md:flex-row-reverse" : ""
//       }`}
//     >
//       {/* Animated image */}
//       <motion.div
//         className="w-full md:w-1/2 overflow-hidden"
//         variants={imageVariants}
//         initial="hidden"
//         animate={controls}
//       >
//         <img
//           src={imgSrc}
//           alt={title}
//           className="w-full h-[350px] object-cover rounded-lg shadow-lg"
//         />
//       </motion.div>

//       {/* Animated text - Fixed dark mode classes */}
//       <motion.div
//         className="md:w-1/2 flex flex-col justify-center text-[#293379] dark:text-white transition-colors duration-300"
//         variants={textVariants}
//         initial="hidden"
//         animate={controls}
//       >
//         <h3 className="text-4xl font-bold mb-4">{title}</h3>
//         <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed transition-colors duration-300">
//           {text}
//         </p>
//       </motion.div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import bgImg from "@/assets/static/bg-image.png";
import feature1Img from "@/assets/static/feature1.png";
import feature2Img from "@/assets/static/feature2.jpg";
import feature3Img from "@/assets/static/feature3.png";
import feature4Img from "@/assets/static/feature4.jpg";
import promo from "@/assets/static/promovid.mp4";
import { motion, useAnimation, useInView } from "framer-motion";
import Lottie from "lottie-react";
import docbot from "@/assets/static/Doctor.json";
import docRegisterAnimation from "@/assets/static/docRegister.json";

import {
  FaRegHandPaper,
  FaMoon,
  FaSun,
  FaTimes,
  FaUserMd,
  FaStethoscope,
  FaHeartbeat,
  FaBriefcaseMedical,
  FaStar,
  FaCheckCircle,
  FaShieldAlt, // Changed from FaUserTie to shield icon
} from "react-icons/fa";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showAdminTooltip, setShowAdminTooltip] = useState(false);

  const messages = [
    "Hi, I'm Curomate",
    "I help you with smart solutions",
    "Let's make your day productive!",
    "Ready to explore?",
  ];

  const [msgIndex, setMsgIndex] = useState(0);

  // Debug effect
  useEffect(() => {
    console.log("Current dark mode state:", isDarkMode);
    console.log("HTML classes:", document.documentElement.classList);
    console.log("Local storage theme:", localStorage.getItem("theme"));
  }, [isDarkMode]);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Show doctor popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    console.log("Toggle clicked, current mode:", isDarkMode);

    if (isDarkMode) {
      // Switching to light mode
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("Switched to light mode");
    } else {
      // Switching to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Switched to dark mode");
    }
  };

  // Add video handler functions
  const openVideo = () => {
    setShowVideo(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setShowVideo(false);
    document.body.style.overflow = "unset";
  };

  // Close video on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showVideo) {
        closeVideo();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showVideo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const medicationRef = useRef(null);
  const appointmentsRef = useRef(null);
  const trackerRef = useRef(null);
  const additionalRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Benefits list for doctor registration
  const doctorBenefits = [
    { icon: <FaBriefcaseMedical />, text: "Expand Your Practice" },
    { icon: <FaHeartbeat />, text: "Connect with Patients" },
    { icon: <FaStethoscope />, text: "Flexible Appointments" },
    { icon: <FaStar />, text: "Build Your Reputation" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Fixed Admin Button in Lower Right Corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative"
          onMouseEnter={() => setShowAdminTooltip(true)}
          onMouseLeave={() => setShowAdminTooltip(false)}
        >

          {/* Admin Button */}
          <Link to="/admin-register">
            <Button
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6a11cb] to-[#2575fc] hover:from-[#7b1fd1] hover:to-[#3a8fff] text-white shadow-xl border-2 border-white/20 dark:border-gray-700/30 hover:scale-110 transition-all duration-300"
              title="Admin Registration"
            >
              <FaShieldAlt className="h-6 w-6" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Doctor Registration Popup */}
      {/* {popupVisible && !showDoctorPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-6 right-24 z-50 max-w-sm"
        >
          <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-[#293379]/30 dark:border-blue-600/30 shadow-2xl rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#293379] to-[#016b61]"></div>

            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-[#293379] to-[#3a4a9c] rounded-full">
                  <FaUserMd className="h-8 w-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#293379] dark:text-white mb-2">
                    Are You a Medical Professional? 🩺
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Join thousands of doctors already transforming healthcare on
                    Cureon. Grow your practice with our smart platform.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctorBenefits.slice(0, 2).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100/70 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        {benefit.icon}
                        {benefit.text}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDoctorPopup(true)}
                      className="flex-1 bg-gradient-to-r from-[#293379] to-[#3a4a9c] hover:from-[#3a4a9c] hover:to-[#293379] text-white font-semibold"
                    >
                      <FaStethoscope className="mr-2" />
                      Register Now
                    </Button>

                    <Button
                      onClick={() => setPopupVisible(false)}
                      variant="ghost"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => setPopupVisible(false)}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )} */}

      {/* Doctor Registration Dialog */}
      <Dialog open={showDoctorPopup} onOpenChange={setShowDoctorPopup}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#293379] via-[#016b61] to-[#fa003f]"></div>

          <DialogHeader className="pt-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-[#293379] to-[#3a4a9c] rounded-full">
                <FaUserMd className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#293379] dark:text-white">
                For Medical Professionals
              </DialogTitle>
            </div>
            <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-300">
              Join our network and revolutionize healthcare delivery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Compact Animation */}
            <div className="flex justify-center">
              <div className="h-32 w-32">
                <Lottie
                  animationData={docRegisterAnimation}
                  loop={true}
                  autoplay={true}
                  className="h-full"
                />
              </div>
            </div>

            {/* Key Benefits in Compact Grid */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#293379] dark:text-white text-center">
                Why Join Cureon? 🌟
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {doctorBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-blue-100 dark:border-gray-700"
                  >
                    <div className="text-[#293379] dark:text-blue-400">
                      {benefit.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-2">
              {[
                {
                  title: "Verified Professional Network",
                  desc: "Exclusive community of certified professionals",
                },
                {
                  title: "Smart Appointment Management",
                  desc: "AI-powered scheduling tools",
                },
                {
                  title: "Practice Growth",
                  desc: "Reach more patients online",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                  <FaStar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                  <span className="font-bold">Limited Offer:</span> First 100
                  doctors get 3 months FREE!
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setShowDoctorPopup(false)}
              variant="outline"
              size="sm"
              className="flex-1 h-10 text-sm"
            >
              Later
            </Button>

            <Link to="/doctor-register" className="flex-1">
              <Button
                className="w-full h-10 text-sm bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#018377] text-white font-semibold"
                onClick={() => setShowDoctorPopup(false)}
              >
                <FaUserMd className="mr-2 h-3 w-3" />
                Start Registration
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeVideo}
        >
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-2"
            >
              <FaTimes className="h-8 w-6" />
            </button>

            {/* Video Player */}
            <video
              className="w-full h-full object-contain rounded-lg"
              controls
              autoPlay
              muted
            >
              <source src={promo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Navbar - Admin button removed from here */}
      {!showVideo && (
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md sticky top-0 z-50 shadow-xl transition-colors">
          {/* Logo */}
          <div className="flex justify-between w-full sm:w-auto items-center mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293379] dark:text-blue-300 tracking-wide hover:cursor-default">
              Cureon
            </h1>

            {/* Mobile Menu Toggle - Only visible on small screens */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="sm:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 dark:border-gray-700 shadow-2xl rounded-xl p-2 w-48">
                {/* Mobile Home Link */}
                <DropdownMenuItem className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer">
                  <Link to="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>

                {/* Mobile Explore Items */}
                {[
                  { title: "Quick Consultations", ref: medicationRef },
                  {
                    title: "Instant Doctor Appointments",
                    ref: appointmentsRef,
                  },
                  { title: "Medication Reminders", ref: trackerRef },
                  { title: "Additional Features", ref: additionalRef },
                ].map((item, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer"
                    onClick={() => scrollToSection(item.ref)}
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}

                {/* Mobile For Doctors Button */}
                <DropdownMenuItem className="rounded-lg">
                  <Button
                    onClick={() => setShowDoctorPopup(true)}
                    variant="outline"
                    className="w-full rounded-full border-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-bold text-sm"
                  >
                    <FaUserMd className="mr-2 h-3 w-3" />
                    For Doctors
                  </Button>
                </DropdownMenuItem>

                {/* Mobile Admin Button - Still kept in mobile menu for accessibility */}
                <DropdownMenuItem className="rounded-lg">
                  <Link to="/admin-register" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-lg text-[#6a11cb] dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-sm"
                    >
                      <FaShieldAlt className="mr-2 h-4 w-4" />
                      Admin Registration
                    </Button>
                  </Link>
                </DropdownMenuItem>

                {/* Mobile Login Button */}
                <DropdownMenuItem className="rounded-lg">
                  <Link to="/login" className="w-full">
                    <Button className="w-full bg-[#016b61] dark:bg-[#018377] text-white hover:bg-[#015951] dark:hover:bg-[#016b61] rounded-full text-sm">
                      Login
                    </Button>
                  </Link>
                </DropdownMenuItem>

                {/* Mobile Dark Mode Toggle */}
                <DropdownMenuItem className="rounded-lg">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label={
                      isDarkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                    {isDarkMode ? (
                      <FaSun className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <FaMoon className="h-4 w-4 text-[#293379]" />
                    )}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <Link
              to="/"
              className="font-medium text-[#293379] dark:text-blue-200 hover:text-[#fa003f] dark:hover:text-blue-100 transition-all duration-300 text-sm lg:text-base"
            >
              Home
            </Link>

            {/* Explore Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#293379] dark:bg-blue-700 text-white font-semibold px-4 lg:px-5 py-2 rounded-full shadow-md hover:bg-[#3a4a9c] dark:hover:bg-blue-600 transition-all duration-300 text-sm lg:text-base">
                  Explore
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 dark:border-gray-700 shadow-2xl rounded-xl p-2 w-48 lg:w-60">
                {[
                  { title: "Quick Consultations", ref: medicationRef },
                  {
                    title: "Instant Doctor Appointments",
                    ref: appointmentsRef,
                  },
                  { title: "Medication Reminders", ref: trackerRef },
                  { title: "Additional Features", ref: additionalRef },
                ].map((item, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    className="rounded-lg hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#4e46e571] dark:hover:from-blue-600 dark:hover:to-purple-600 text-gray-900 dark:text-gray-100 transition-all duration-300 cursor-pointer text-sm lg:text-base"
                    onClick={() => scrollToSection(item.ref)}
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Doctor Registration Button in Nav */}
            <Button
              onClick={() => setShowDoctorPopup(true)}
              variant="outline"
              className="rounded-full border-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-bold text-sm lg:text-base py-2 px-3 lg:px-4"
            >
              {/* <FaUserMd className="mr-2 h-3 w-3 lg:h-4 lg:w-4" /> */}
              <span className="hidden lg:inline">Doctors</span>
              <span className="lg:hidden">Doctors</span>
            </Button>

            {/* Login Button */}
            <Link to="/login">
              <Button className="bg-[#016b61] dark:bg-[#018377] text-white font-semibold px-4 lg:px-5 py-2 rounded-full shadow-md hover:bg-[#015951] dark:hover:bg-[#016b61] transition-all duration-300 text-sm lg:text-base">
                <span className="hidden lg:inline">Login</span>
                <span className="lg:hidden">Login</span>
              </Button>
            </Link>

            {/* Dark Mode Toggle - Simplified */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <FaSun className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-4 w-4 lg:h-5 lg:w-5 text-[#293379]" />
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Body */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[85vh] bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-10 md:px-16 py-10 md:py-0 transition-colors">
        {/* Left: Hero Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#293379] dark:text-white leading-tight">
            Your Health Companion
          </h2>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-lg mx-auto md:mx-0">
            Track your health, book appointments, and stay in control of your
            wellness journey — all with a touch of AI care.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={openVideo}
              className="px-10 py-4 text-lg bg-[#016b61] dark:bg-[#018377] text-white hover:scale-105 hover:bg-[#015951] dark:hover:bg-[#016b61] transition-all duration-300 shadow-md"
            >
              <i className="fa-solid fa-circle-play"></i>
              &nbsp; Know Us
            </Button>
          </div>
        </div>
        {/* Right: Curomate Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          {/* Speech Bubble */}
          <div className="absolute top-4 md:top-4 bg-white dark:bg-gray-800 text-[#293379] dark:text-blue-200 px-5 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 animate-bounce">
            <div className="flex items-center gap-2 leading-none">
              <FaRegHandPaper className="text-[rgb(30,48,80)] dark:text-blue-200" />
              <span>
                {messages[msgIndex].includes("Curomate") ? (
                  <>
                    Hi, I'm{" "}
                    <span className="font-bold text-[#fa003f] dark:text-red-400">
                      Curomate
                    </span>
                  </>
                ) : (
                  messages[msgIndex]
                )}
              </span>
            </div>
          </div>

          {/* Animation */}
          <div className="max-w-xs md:max-w-sm lg:max-w-md mt-6 md:mt-10">
            <Lottie animationData={docbot} loop={true} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-32 space-y-24 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <FeatureCard
          refProp={medicationRef}
          title="Quick Consultations"
          text="Get instant consultations with licensed doctors online. Avoid long queues and manage your health efficiently from the comfort of your home."
          imgSrc={feature1Img}
          reverse={false}
        />
        <FeatureCard
          refProp={appointmentsRef}
          title="Instant Doctor Appointments"
          text="Schedule appointments instantly with verified professionals. Receive notifications and reminders so you never miss a session."
          imgSrc={feature2Img}
          reverse={true}
        />
        <FeatureCard
          refProp={trackerRef}
          title="Medication Reminders"
          text="Set up personalized medication schedules. Get automatic alerts and track your daily doses to ensure a healthy routine."
          imgSrc={feature3Img}
          reverse={false}
        />
        <FeatureCard
          refProp={additionalRef}
          title="Happy Healthing"
          text="Monitor your symptoms, track vitals, maintain health logs, and explore extra wellness tools tailored to your needs."
          imgSrc={feature4Img}
          reverse={true}
        />
      </section>

      {/* Footer */}
      <footer className="bg-[#293379] dark:bg-gray-900 backdrop-blur-md text-white/90 p-8 mt-auto shadow-inner transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section — Brand + Motto */}
          <div>
            <h2 className="text-xl font-bold mb-2">Cureon</h2>
            <p className="text-white/70 dark:text-gray-300 text-sm">
              Empowering your medical health journey with care, technology, and
              compassion, one step at-a-time.
            </p>
            <p className="text-white/60 dark:text-gray-400 text-xs mt-3">
              Designed with{" "}
              <i className="fa-solid fa-heart text-[#fa003f] dark:text-red-400"></i>{" "}
              for your health
            </p>
          </div>

          {/* Right Section — Contact + Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-mobile"></i> +91 00000 00000
            </p>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-envelope"></i> support@cureon.com
            </p>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-location-dot"></i> 123 Health Street,
              Kolkata, India
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3 mt-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-black transition-all duration-300"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Policy Links Row */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 dark:text-gray-300 mt-10">
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Cookie Policy
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 dark:border-gray-600 mt-1 pt-3 text-center text-white/70 dark:text-gray-400 text-xs">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Cureon</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, text, imgSrc, reverse = false, refProp }) {
  const localRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          } else {
            controls.start("hidden");
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls]);

  const imageVariants = {
    hidden: { x: reverse ? 150 : -150, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { x: reverse ? -100 : 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div
      ref={(node) => {
        localRef.current = node;
        if (refProp) refProp.current = node;
      }}
      className={`flex flex-col md:flex-row items-center gap-10 p-6 md:p-10 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Animated image */}
      <motion.div
        className="w-full md:w-1/2 overflow-hidden"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-[350px] object-cover rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Animated text - Fixed dark mode classes */}
      <motion.div
        className="md:w-1/2 flex flex-col justify-center text-[#293379] dark:text-white transition-colors duration-300"
        variants={textVariants}
        initial="hidden"
        animate={controls}
      >
        <h3 className="text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed transition-colors duration-300">
          {text}
        </p>
      </motion.div>
    </div>
  );
}