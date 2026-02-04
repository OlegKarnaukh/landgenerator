'use client';

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactData {
  title?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  mapUrl?: string;
  variant?: 'form' | 'info' | 'split';
}

export function ContactSection({ data }: { data: ContactData }) {
  const variant = data.variant || 'split';
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  const ContactInfo = () => (
    <div className="space-y-6">
      {data.phone && (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Телефон</p>
            <a href={`tel:${data.phone}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {data.phone}
            </a>
          </div>
        </div>
      )}
      {data.email && (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <a href={`mailto:${data.email}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {data.email}
            </a>
          </div>
        </div>
      )}
      {data.address && (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Адрес</p>
            <p className="text-lg font-semibold text-gray-900">{data.address}</p>
          </div>
        </div>
      )}
      {data.workingHours && (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Режим работы</p>
            <p className="text-lg font-semibold text-gray-900">{data.workingHours}</p>
          </div>
        </div>
      )}
    </div>
  );

  const ContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          required
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Телефон"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Сообщение (необязательно)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Send className="h-5 w-5" />
        Отправить заявку
      </button>
    </form>
  );

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'info' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <ContactInfo />
          </div>
        ) : variant === 'form' ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <ContactForm />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Свяжитесь с нами</h3>
              <ContactInfo />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Оставить заявку</h3>
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
