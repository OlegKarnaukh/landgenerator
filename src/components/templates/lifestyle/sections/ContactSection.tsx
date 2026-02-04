'use client';

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContactData {
  title?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  mapUrl?: string;
}

export function LifestyleContactSection({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <div>
              {data.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                  {data.title}
                </h2>
              )}
              {data.subtitle && (
                <p className="text-lg text-stone-600 mb-8">{data.subtitle}</p>
              )}

              <div className="space-y-6">
                {data.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800">Адрес</div>
                      <div className="text-stone-600">{data.address}</div>
                    </div>
                  </div>
                )}

                {data.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800">Телефон</div>
                      <a href={`tel:${data.phone}`} className="text-amber-600 hover:text-amber-700">
                        {data.phone}
                      </a>
                    </div>
                  </div>
                )}

                {data.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800">Email</div>
                      <a href={`mailto:${data.email}`} className="text-amber-600 hover:text-amber-700">
                        {data.email}
                      </a>
                    </div>
                  </div>
                )}

                {data.workingHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800">Часы работы</div>
                      <div className="text-stone-600">{data.workingHours}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Contact form */}
            <div className="bg-stone-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-stone-800 mb-6">Записаться</h3>
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    className="bg-white border-stone-200 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    className="bg-white border-stone-200 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white border-stone-200 h-12"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Сообщение"
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Отправить заявку
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
