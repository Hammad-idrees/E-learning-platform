import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  List,
  FileText,
  Target,
} from "lucide-react";

const TableOfContents = ({ toc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get the content from the TOC data
  const tocContent = toc && toc.length > 0 ? toc[0].content : "";

  // Count meaningful content lines for summary
  const contentLines = tocContent
    ? tocContent.split("\n").filter((line) => line.trim()).length
    : 0;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-200/30 dark:border-slate-700/50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-200/30 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                Table of Contents
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Course structure and topics overview
              </p>
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isExpanded ? (
              <>
                <span className="mr-2 font-medium">Collapse</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span className="mr-2 font-medium">View Contents</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content - Enhanced formatting */}
      {isExpanded && (
        <div className="p-6">
          {tocContent ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {tocContent.split("\n").map((line, index) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine)
                    return <div key={index} className="h-3"></div>;

                  // Simple formatting based on line characteristics
                  const isAllCaps =
                    trimmedLine === trimmedLine.toUpperCase() &&
                    trimmedLine.length > 3;
                  const hasColon =
                    trimmedLine.includes(":") && !trimmedLine.startsWith(" ");
                  const isBulletPoint = /^[•\-→★▸▪▫⚡🔹🔸📌📍]\s/u.test(
                    trimmedLine
                  );
                  const isNumbered = /^\d+[.)]\s/.test(trimmedLine);

                  if (isAllCaps) {
                    return (
                      <div
                        key={index}
                        className="mb-4 mt-6 pb-2 border-b-2 border-blue-200 dark:border-blue-600"
                      >
                        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 tracking-wide">
                          {trimmedLine}
                        </h3>
                      </div>
                    );
                  } else if (hasColon && !isBulletPoint) {
                    return (
                      <div key={index} className="mb-3 mt-5">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {trimmedLine}
                        </h4>
                      </div>
                    );
                  } else if (isBulletPoint) {
                    const bulletChar =
                      trimmedLine.match(/^[•\-→★▸▪▫⚡🔹🔸📌📍]/u)[0];
                    const textContent = trimmedLine.replace(
                      /^[•\-→★▸▪▫⚡🔹🔸📌📍]\s*/u,
                      ""
                    );

                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-3 py-1 ml-4"
                      >
                        <span className="text-blue-600 dark:text-blue-400 text-lg mt-0.5 flex-shrink-0">
                          {bulletChar}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                          {textContent}
                        </span>
                      </div>
                    );
                  } else if (isNumbered) {
                    const numberMatch = trimmedLine.match(/^\d+[.)]/)[0];
                    const textContent = trimmedLine.replace(/^\d+[.)]\s*/, "");

                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-3 py-1 ml-4"
                      >
                        <span className="text-blue-600 dark:text-blue-400 font-semibold min-w-fit bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                          {numberMatch}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                          {textContent}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="py-1">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {trimmedLine}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Content Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Table of contents will appear here once added by the instructor.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Collapsed State Summary - Enhanced */}
      {!isExpanded && (
        <div className="p-6">
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {tocContent
                    ? "Course Structure Available"
                    : "No Structure Yet"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tocContent
                    ? `${contentLines} items • Click to explore the course outline`
                    : "Course outline will be added soon"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {tocContent ? "Ready to View" : "Coming Soon"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
