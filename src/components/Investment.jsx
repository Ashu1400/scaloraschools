import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Globe, Users } from 'lucide-react';
import './Investment.css';

const Investment = () => {
  const pillars = [
    {
      icon: <Target size={32} />,
      title: "Enfoque estratégico",
      desc: "Identificamos líderes de mercado con ventajas competitivas sostenibles y potencial de expansión internacional."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Creación de valor",
      desc: "Trabajamos mano a mano con los equipos directivos para implementar planes de crecimiento ambiciosos y viables."
    },
    {
      icon: <Globe size={32} />,
      title: "Visión global",
      desc: "Apalancamos nuestra red internacional para abrir nuevos mercados y facilitar alianzas estratégicas."
    },
    {
      icon: <Users size={32} />,
      title: "Talento",
      desc: "Creemos en las personas. Atraemos, retenemos y desarrollamos el mejor talento para liderar la transformación."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="investment bg-dark" id="inversion">
      <div className="container">
        <div className="investment-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-white">Nuestra visión de inversión</h2>
            <p className="investment-subtitle">
              Invertimos en empresas con un track record demostrado y ambición global,
              proporcionando los recursos necesarios para multiplicar su escala.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="pillars-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pillar, index) => (
            <motion.div className="pillar-card" key={index} variants={itemVariants}>
              <div className="pillar-icon text-blue">
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Investment;
