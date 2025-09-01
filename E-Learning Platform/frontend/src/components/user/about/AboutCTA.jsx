const AboutCTA = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px]">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 p-8 sm:p-10 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold group-hover:translate-x-1 transition-transform duration-300">
                Start Your ACCA Journey
              </h3>
              <p className="mt-2 text-white/90 dark:text-white/80 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                Join AfaqNama and experience premium, exam-focused learning
                designed for results.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-100 text-blue-700 dark:text-blue-800 font-semibold px-5 py-3 shadow hover:shadow-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-slate-200 hover:scale-105 hover:-translate-y-0.5 group-hover:scale-110 group-hover:-translate-y-1"
              >
                Explore Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutCTA;
