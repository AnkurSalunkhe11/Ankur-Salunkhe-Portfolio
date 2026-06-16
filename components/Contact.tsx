'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getPersonalData } from '@/lib/data-loader';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';
import { usePortfolioStore } from '@/lib/store';

export default function Contact() {
  const { domain } = usePortfolioStore();
  const personalData = getPersonalData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
    numA: 0,
    numB: 0,
    captchaAnswer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const generateCaptcha = useCallback(() => {
    const a = Math.floor(Math.random() * 9) + 1; // 1-9
    const b = Math.floor(Math.random() * 9) + 1; // 1-9
    setFormData(prev => ({
      ...prev,
      numA: a,
      numB: b,
      captchaAnswer: ''
    }));
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    analytics.trackContactFormSubmit();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: data.message || "Thank you for getting in touch. I will respond to you shortly.",
        });

        // Fallback: If simulated, log locally so the Admin Dashboard can list it
        if (data.simulated) {
          const localMsgs = JSON.parse(localStorage.getItem('portfolio_local_messages') || '[]');
          localMsgs.push({
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            message: formData.message,
            date: new Date().toLocaleString(),
          });
          localStorage.setItem('portfolio_local_messages', JSON.stringify(localMsgs));
        }

        setFormData({
          name: '',
          email: '',
          message: '',
          honeypot: '',
          numA: 0,
          numB: 0,
          captchaAnswer: ''
        });
        generateCaptcha();
      } else {
        throw new Error(data.error || "Failed to send message.");
      }
    } catch (error: any) {
      toast({
        title: "Error Sending Message",
        description: error.message || "There was an issue sending your message. Please try again.",
        variant: "destructive",
      });
      generateCaptcha(); // Regenerate Captcha upon failure to secure state
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormStart = () => {
    analytics.trackContactFormStart();
  };

  const handleSocialClick = (platform: string, url: string) => {
    analytics.trackSocialClick(platform);
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    analytics.trackSocialClick('email');
    window.open(`mailto:${personalData.email}`);
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 space-y-3 text-left"
        >
          <span className="text-xs font-mono font-medium tracking-tight text-slate-400 dark:text-slate-500">
            // GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Contact Details
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Let's discuss your next project or opportunity. I'm always open to new challenges and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-sans">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-550 text-xs font-mono">EMAIL</p>
                    <button 
                      onClick={handleEmailClick}
                      className="text-slate-800 dark:text-slate-200 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-ring rounded"
                    >
                      {personalData.email}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-650 dark:text-emerald-450" />
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-550 text-xs font-mono">LOCATION</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{personalData.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-650 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-550 text-xs font-mono">PHONE</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{personalData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/40 dark:bg-slate-950/20 rounded-2xl p-6 border border-slate-200/40 dark:border-slate-900">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 font-sans">Professional Networks</h4>
              <p className="text-slate-505 dark:text-slate-400 text-sm mb-4 leading-relaxed font-medium">
                I'm always interested in discussing new opportunities, creative projects, 
                or just having a conversation about technology and engineering.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSocialClick('linkedin', personalData.linkedin)}
                  className="text-indigo-650 dark:text-indigo-400 hover:underline text-sm font-semibold transition-colors focus-ring rounded"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleSocialClick('github', personalData.github)}
                  className="text-slate-600 dark:text-slate-400 hover:underline text-sm font-semibold transition-colors focus-ring rounded"
                >
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/40 dark:bg-slate-950/20 border-slate-200/40 dark:border-slate-900 rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white font-sans text-lg">Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from users, catches automated bots) */}
                  <div className="hidden" aria-hidden="true">
                    <Input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-600 dark:text-slate-400 text-xs font-mono font-semibold">NAME</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleFormStart}
                        required
                        className="bg-white/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus-ring"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-600 dark:text-slate-400 text-xs font-mono font-semibold">EMAIL</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFormStart}
                        required
                        className="bg-white/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus-ring"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-600 dark:text-slate-400 text-xs font-mono font-semibold">MESSAGE</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      required
                      rows={6}
                      className="bg-white/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 resize-none focus-ring"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>

                  {/* Mathematical CAPTCHA Verification */}
                  <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-900 p-4 rounded-xl">
                    <Label htmlFor="captchaAnswer" className="text-slate-600 dark:text-slate-400 text-xs block mb-1">
                      Spam Protection: What is <span className="font-bold text-slate-805 dark:text-slate-200 text-sm bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded">{formData.numA}</span> + <span className="font-bold text-slate-805 dark:text-slate-200 text-sm bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded">{formData.numB}</span>?
                    </Label>
                    <Input
                      id="captchaAnswer"
                      name="captchaAnswer"
                      type="text"
                      maxLength={5}
                      value={formData.captchaAnswer}
                      onChange={handleChange}
                      required
                      placeholder="Enter calculation result"
                      className="bg-white/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus-ring text-center tracking-widest"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 flex items-center justify-center space-x-2 font-mono uppercase tracking-wider text-xs font-semibold focus-ring transition-all duration-200 border rounded-xl ${
                      domain === 'cs'
                        ? 'border-indigo-500/30 dark:border-indigo-400/30 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10'
                        : 'border-emerald-500/30 dark:border-emerald-400/30 text-emerald-650 dark:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                          domain === 'cs' ? 'border-indigo-650 dark:border-indigo-400' : 'border-emerald-650 dark:border-emerald-400'
                        }`}></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}