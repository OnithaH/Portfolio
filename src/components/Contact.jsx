import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiSend } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      await Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        background: '#0f172a',
        color: '#e2e8f0',
        confirmButtonColor: '#6366f1',
      });
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    await Swal.fire({
      title: '🎉 Message Sent!',
      html: `<p style="color:#94a3b8;">Thank you <strong style="color:#6366f1;">${formData.name}</strong>! I'll get back to you soon.</p>`,
      icon: 'success',
      background: '#0f172a',
      color: '#e2e8f0',
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Awesome!',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Build Something Amazing</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="space-y-4">
              {[
                { icon: FiMail, label: 'Email', value: 'onithaH@example.com', href: 'mailto:onithaH@example.com' },
                { icon: FiGithub, label: 'GitHub', value: 'github.com/OnithaH', href: 'https://github.com/OnithaH' },
                { icon: FiMapPin, label: 'Location', value: 'Sri Lanka', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300"
                  whileHover={{ x: 6 }}
                >
                  <div className="p-3 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-gray-300 hover:text-indigo-400 transition-colors text-sm" target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-white/10 p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { name: 'name', placeholder: 'Your Name', type: 'text' },
                { name: 'email', placeholder: 'Your Email', type: 'email' },
              ].map((field) => (
                <div key={field.name}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 focus:border-indigo-500/60 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (Optional)"
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 focus:border-indigo-500/60 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Your Message..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 focus:border-indigo-500/60 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 neon-glow"
              whileHover={{ scale: sending ? 1 : 1.02 }}
              whileTap={{ scale: sending ? 1 : 0.98 }}
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
