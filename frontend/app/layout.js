import './globals.css';

export const metadata = {
  title: 'ChatApp',
  description: 'WhatsApp jesa chat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}