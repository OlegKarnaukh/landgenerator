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
}

export function LocalContactSection({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <div>
              {data.title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {data.title}
                </h2>
              )}
              {data.subtitle && (
                <p className="text-lg text-slate-400 mb-8">{data.subtitle}</p>
              )}

              <div className="space-y-6">
                {data.phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Телефон</div>
                      <a href={`tel:${data.phone}`} className="text-xl font-semibold hover:text-blue-400">
                        {data.phone}
                      </a>
                    </div>
                  </div>
                )}

                {data.address && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Адрес</div>
                      <div className="text-lg">{data.address}</div>
                    </div>
                  </div>
                )}

                {data.workingHours && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Часы работы</div>
                      <div className="text-lg">{data.workingHours}</div>
                    </div>
                  </div>
                )}

                {data.email && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Email</div>
                      <a href={`mailto:${data.email}`} className="text-lg hover:text-blue-400">
                        {data.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 text-slate-800">
              <h3 className="text-2xl font-bold mb-6">Записаться на приём</h3>
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    className="h-12 border-slate-200"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    className="h-12 border-slate-200"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Опишите проблему"
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Отправить заявку
                  <Send className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-sm text-slate-500 text-center">
                  Перезвоним в течение 15 минут
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
