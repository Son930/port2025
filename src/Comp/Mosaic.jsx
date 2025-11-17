import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Mosaic = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Placeholder images from Unsplash - you can replace these with your own photos later
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 1",
      category: "portrait"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 2",
      category: "portrait"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 3",
      category: "portrait"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 4",
      category: "portrait"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 5",
      category: "portrait"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 6",
      category: "portrait"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 7",
      category: "portrait"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 8",
      category: "portrait"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 9",
      category: "portrait"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 10",
      category: "portrait"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 11",
      category: "portrait"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      alt: "Portrait 12",
      category: "portrait"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <section className="relative w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-darkBg via-black to-darkBg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#00ffff_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-plutur font-bold text-white mb-6">
            <span className="text-gradient">Photo</span> Mosaic
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collection of moments, memories, and milestones that tell my story
          </p>
        </motion.div>

        {/* Mosaic Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index % 3 === 0 ? 'row-span-2 col-span-2' : 
                index % 5 === 0 ? 'col-span-2' : 
                index % 7 === 0 ? 'row-span-2' : ''
              }`}
              onClick={() => openModal(image)}
            >
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Want to see more? Let's connect and share our stories!
          </p>
          <button className="btn-classic bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-neon-blue hover:shadow-neon-purple">
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  ✕
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">{selectedImage.alt}</h3>
                <p className="text-gray-300 text-sm mt-2">Click outside to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Mosaic;
