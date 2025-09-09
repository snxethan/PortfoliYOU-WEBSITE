import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-gray-800 w-full mb-4"></div>

      <div className="flex min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:flex sticky top-[64px] h-[calc(100vh-64px)] min-w-[260px] max-w-[300px] border-r border-[#333] bg-[#181818]/70 pl-2">
          <div className="m-auto flex w-full max-w-[260px] flex-col items-stretch gap-3 px-4 py-4">
            {Array(5).fill(0).map((_, index) => (
              <div
                key={index}
                className="h-10 bg-gray-700 rounded-lg mb-3"
              ></div>
            ))}
          </div>
        </aside>

        {/* Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="mx-auto max-w-7xl px-4 md:px-25 pt-24 pb-16">
            <div className="space-y-10">
              {Array(5).fill(0).map((_, index) => (
                <div key={index} className="space-y-4">
                  {/* Section Header Skeleton */}
                  <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>

                  {/* Section Content Skeleton */}
                  <div className="space-y-2">
                    {Array(3).fill(0).map((_, subIndex) => (
                      <div
                        key={subIndex}
                        className="h-4 bg-gray-600 rounded w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
