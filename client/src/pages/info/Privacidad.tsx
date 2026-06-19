import React from 'react'
import { Link } from 'react-router-dom'

export default function Privacidad() {
  return (
    <article className="prose prose-gray max-w-none px-4 sm:px-0">

      <Link to="/auth/register" className="inline-flex items-center gap-2 text-sm text-[#C53F56] font-semibold mb-10 no-underline hover:underline">
        ← Volver
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">Política de Privacidad</h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: junio de 2026</p>

      <Section title="1. Responsable del tratamiento">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <Row label="Nombre" value="Inkly" />
            <Row label="País" value="España" />
            <Row label="Contacto" value="adriiglesiass2016@gmail.com" />
          </tbody>
        </table>
      </Section>

      <Section title="2. ¿Qué datos recogemos?">
        <p>Al crear una cuenta en Inkly, recogemos los siguientes datos personales:</p>
        <ul>
          <li><strong>Nombre y apellidos</strong> — para identificarte dentro de la plataforma.</li>
          <li><strong>Correo electrónico</strong> — para gestionar tu acceso y comunicaciones de cuenta.</li>
          <li><strong>Contraseña</strong> — almacenada cifrada. Nunca tenemos acceso a ella en texto plano.</li>
          <li><strong>Región</strong> — para personalizar el contenido según tu ubicación.</li>
        </ul>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Tus datos se utilizan exclusivamente para:</p>
        <ul>
          <li>Crear y gestionar tu cuenta de usuario.</li>
          <li>Permitirte acceder a la plataforma y sus funcionalidades.</li>
          <li>Enviarte comunicaciones relacionadas con tu cuenta (cambios de contraseña, notificaciones del servicio).</li>
        </ul>
      </Section>

      <Section title="4. Base jurídica">
        <p>
          El tratamiento se basa en el <strong>Art. 6.1.b del RGPD</strong>: ejecución de un contrato
          en el que el interesado es parte, es decir, la prestación del servicio que nos solicitas al registrarte.
        </p>
      </Section>

      <Section title="5. Conservación de los datos">
        <p>
          Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, tus datos
          serán suprimidos en un plazo máximo de <strong>30 días</strong>, salvo obligación legal que exija conservarlos.
        </p>
      </Section>

      <Section title="6. Cesión a terceros">
        <p>
          <strong>No cedemos tus datos a terceros.</strong> Inkly no vende, alquila ni comparte tus datos personales.
          Únicamente podrían comunicarse ante requerimiento judicial o de autoridad competente.
        </p>
      </Section>

      <Section title="7. Tus derechos">
        <p>De acuerdo con el RGPD y la LOPDGDD, tienes derecho a:</p>
        <ul>
          <li><strong>Acceso</strong> — saber qué datos tenemos sobre ti.</li>
          <li><strong>Rectificación</strong> — corregir datos inexactos o incompletos.</li>
          <li><strong>Supresión</strong> — solicitar la eliminación de tus datos.</li>
          <li><strong>Portabilidad</strong> — recibir tus datos en formato estructurado.</li>
          <li><strong>Oposición y limitación</strong> — oponerte o limitar ciertos tratamientos.</li>
        </ul>
        <p>
          Escríbenos a <a href="mailto:adriiglesiass2016@gmail.com" className="text-[#C53F56]">adriiglesiass2016@gmail.com</a> y
          responderemos en un plazo máximo de 30 días. También puedes reclamar ante la{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-[#C53F56]">AEPD</a>.
        </p>
      </Section>

      <Section title="8. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados.
          Las contraseñas se almacenan siempre cifradas mediante algoritmos de hash seguros.
        </p>
      </Section>

      <Section title="9. Cambios en esta política">
        <p>
          Podemos actualizar esta política en cualquier momento. Te notificaremos cambios relevantes
          por correo electrónico o mediante un aviso en la plataforma.
        </p>
      </Section>

      <p className="text-sm text-gray-400 mt-10 border-t border-gray-200 pt-6">
        ¿Dudas? Contáctanos en{' '}
        <a href="mailto:adriiglesiass2016@gmail.com" className="text-[#C53F56]">adriiglesiass2016@gmail.com</a>
      </p>

    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 pr-4 font-semibold text-gray-700 w-24 sm:w-32">{label}</td>
      <td className="py-2 text-gray-600 break-all sm:break-normal">{value}</td>
    </tr>
  )
}