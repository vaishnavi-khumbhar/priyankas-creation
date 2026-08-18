import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA(){
  return <section className="py-10 lg:py-10">
    <div className="container-page">
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative overflow-hidden rounded-[38px] bg-gradient-to-r from-brand-magenta via-brand-pink to-brand-violet px-7 sm:px-12 py-14 text-white text-center">
        <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full border border-white/20"/>
        <p className="font-script text-3xl text-pink-100">Made especially for you</p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold">Let's Create Something Beautiful </h2>
        <p className="max-w-2xl mx-auto mt-4 text-white/80">Personalized exam boards, photo frames and thoughtful gifts designed around your special moments.</p>
<Link
  to="/products"
  className="inline-flex mt-7 px-7 py-3.5 rounded-full bg-white text-brand-magenta font-semibold hover:-translate-y-1 transition"
>
  Explore Collection →
</Link>      </motion.div>
    </div>
  </section>
}
