import { Inter, PT_Sans_Caption } from 'next/font/google';
import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = {
  children: React.ReactNode;
};

const ptSansCaption = PT_Sans_Caption({
    subsets: ['latin'],
    weight: '700',
    variable: '--font-sans'
})

const inter = Inter({
   subsets: ['latin'],
   weight: ['400','500'],
   variable: '--font-inter'
  });

export const Layout = ({ children }: LayoutProps) => {
    return(
        <div className={`${inter.className} ${ptSansCaption.className} relative flex min-h-screen flex-col bg-linear-to-r from-cyan-300 to-blue-400 font-inter`}>
            <Header/>
            <main className="flex-1 flex flex-col mt-10 mb-12 ">{children}</main>
            <Footer/>
        </div>
    )
}