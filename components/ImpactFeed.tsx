import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ImpactStory } from '../types';
import { Calendar, Heart, Play, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface Props {
  stories: ImpactStory[];
}

const StoryCard = React.memo<{ story: ImpactStory, index: number }>(({ story, index }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Robust YouTube ID extraction (Supports URL or Iframe)
  const getYouTubeId = (input: string) => {
    if (!input) return null;
    let url = input;

    // If input is an iframe string, extract the src
    if (input.includes('<iframe') && input.includes('src="')) {
        const srcMatch = input.match(/src="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
            url = srcMatch[1];
        }
    }

    // Regex to capture ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to convert common image host viewer links to direct links
  const processImageUrl = (url: string | undefined) => {
    if (!url) return undefined;

    // Fix for freeimage.host viewer links
    if (url.includes('freeimage.host/i/')) {
        const parts = url.split('/').filter(Boolean);
        const id = parts[parts.length - 1];
        if (id) return `https://iili.io/${id}.jpg`;
    }

    return url;
  };

  const videoId = getYouTubeId(story.imageUrl || '');
  const isVideo = !!videoId;

  // Initialize image source
  useEffect(() => {
    setHasError(false);
    if (videoId) {
        // Try max resolution first
        setImgSrc(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
        setImgSrc(processImageUrl(story.imageUrl) || '');
    }
  }, [story.imageUrl, videoId]);

  const handleImageError = () => {
    if (videoId && imgSrc.includes('maxresdefault')) {
        // Fallback to HQ thumbnail if Max Res doesn't exist
        setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else {
        setHasError(true);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsPlaying(true);
  };

  const description = story.description || '';
  const shouldTruncate = description.length > 150; // Increased truncation threshold

  return (
     <div 
        className={`flex-none w-[90vw] md:w-[480px] snap-center flex flex-col bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-black/30 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10 transition-all duration-500 group border border-gray-100 dark:border-slate-700 relative ${isExpanded ? 'h-auto' : 'h-[560px]'}`}
     >
        {/* Media Container - Aspect Ratio 16:9 to match YouTube/HD standards */}
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-900 relative flex-shrink-0">
          {isPlaying && videoId ? (
             <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=${window.location.origin}`}
                title={story.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
             ></iframe>
          ) : !hasError && imgSrc ? (
            <>
                <img 
                  src={imgSrc} 
                  alt={story.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                  onError={handleImageError}
                />
                {isVideo && (
                    <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer z-10"
                        onClick={handlePlay}
                    >
                        <div className="w-16 h-16 rounded-full bg-red-600 shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-7 h-7 text-white fill-current ml-1" />
                        </div>
                    </div>
                )}
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
               {/* Decorative Abstract Pattern */}
               <div className="absolute inset-0 opacity-20 dark:opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00629B 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
               
               <div className="relative z-10 flex flex-col items-center p-6 text-center">
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-sm mb-4 border border-blue-100 dark:border-slate-600">
                     <ImageIcon className="w-8 h-8 text-blue-400 dark:text-blue-300" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-blue-900 dark:text-blue-200 uppercase mb-1">Impact Update</span>
                  <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow min-h-0 bg-white dark:bg-slate-800">
            <div className="flex-none flex items-center text-xs font-bold text-[#00629B] dark:text-blue-400 uppercase tracking-wider mb-3 bg-blue-50 dark:bg-blue-900/20 inline-flex self-start px-3 py-1 rounded-full">
                <Calendar className="w-3 h-3 mr-2" />
                {story.date}
            </div>
            
            {/* Title: Full subject, no truncation. Flex-none. */}
            <h3 className="flex-none text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-[#00629B] dark:group-hover:text-blue-400 transition-colors font-heading">
                {story.title}
            </h3>
            
            {/* Description: Fills space or expands. */}
            <div className="flex-1 relative">
                <p className={`text-gray-500 dark:text-gray-400 leading-relaxed text-sm pr-1 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
                    {description}
                </p>
            </div>

            <div className="flex-none mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/50">
              {shouldTruncate && (
                  <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(!isExpanded);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#00629B] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none flex items-center gap-1 py-1"
                  >
                      {isExpanded ? 'Show Less' : 'Read Full Story'}
                  </button>
              )}
            </div>
        </div>
     </div>
  );
});

export const ImpactFeed: React.FC<Props> = React.memo(({ stories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Sort by Date Descending
  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [stories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Calculate scroll amount based on card width (480px + 24px gap)
      // We read the actual card width if possible or fallback to 504
      const cardWidth = container.children[0]?.clientWidth || 480;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      let newScrollLeft;

      if (direction === 'left') {
        newScrollLeft = container.scrollLeft - scrollAmount;
      } else {
        // Check if we are near the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
           newScrollLeft = 0; // Loop back to start
        } else {
           newScrollLeft = container.scrollLeft + scrollAmount;
        }
      }
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (stories.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [stories, isPaused]);

  if (stories.length === 0) return null;

  return (
    <div id="impact" className="py-24 transition-colors duration-500 bg-gray-50 dark:bg-[#020617] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
            <div className="mb-6 md:mb-0">
                <div className="inline-block p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-4">
                    <Heart className="w-8 h-8 text-[#00629B] dark:text-blue-400 fill-current" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight font-heading text-gray-900 dark:text-white">Relief in Action</h2>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl">Real stories from the ground showing the tangible impact of your generosity.</p>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex gap-3">
                <button 
                    onClick={() => scroll('left')}
                    className="p-3 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 z-20"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="p-3 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 z-20"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Carousel Container - items-start allows expansion without stretching siblings */}
        <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar custom-scrollbar items-start"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
           {sortedStories.map((story, index) => (
             <StoryCard key={story.id} story={story} index={index} />
           ))}
        </div>
      </div>
    </div>
  );
});