import { useState } from "react";


export default function QuizMaker() {

    const [pdfs, setPdfs] = useState([]);
    const [quiz, setQuiz] = useState(null);

    return (
        <div className="flex flex-col max-w-full h-full font-bold text-2xl text-white">
            <div className="flex justify-center items-center w-full min-h-1/10">Generate quiz</div>
            <div className="flex w-full h-full">
                <div className="flex flex-col items-center gap-5 w-1/2 h-full p-5">
                    <div className="flex flex-col items-center w-full h-1/3 bg-black/40 pt-10 rounded-2xl">
                        <h2>Import files</h2>
                        <div className="flex gap-5 w-full h-full items-center p-5 pl-0">
                            <input type="file" accept="application/pdf" multiple className="hidden" id="pdf-input"
                                onChange={(e) => {
                                    const newFiles = Array.from(e.target.files);

                                    setPdfs(prev => {
                                        const all = [...prev, ...newFiles];
                                        const unique = all.filter(
                                            (file, index, self) =>
                                                index === self.findIndex(f => f.name === file.name && f.size === file.size)
                                        );
                                        return unique;
                                    });
                                }
                                } />
                            <label htmlFor="pdf-input" className="flex justify-center items-center ml-7 cursor-pointer hover:scale-105 duration-200">
                                <img className="w-12" src="/upload.png" alt="upload" />
                            </label>
                            <div className="custom-scrollbar flex gap-5 w-full h-full p-3 overflow-x-auto">
                                {pdfs.length > 0 ?
                                    pdfs.map((pdf) => (
                                        <div key={pdf.name} className="flex flex-col gap-3 items-center justify-center">
                                            <img className="w-10" src="/pdf.png" alt="file" />
                                            <p className="text-sm font-medium ">{pdf.name.substring(0, 7)}</p>
                                        </div>
                                    )) : (
                                        <div className="w-full h-full flex justify-left items-center font-normal text-lg opacity-60">No files imported.</div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-center w-full h-1/2 bg-black/40 p-10 rounded-2xl">
                        <h2>Write text</h2>
                        <textarea className="w-full h-full border-2 border-white/50 focus:border-white duration-200 resize-none text-base font-medium focus:ring-0 autofill:bg-transparent rounded-lg p-3">
                        </textarea>
                    </div>
                    <button className="w-1/2 border-2 px-5 py-3 mt-2 rounded-lg text-lg cursor-pointer hover:bg-white hover:text-zinc-800 duration-200">
                        Generate quiz
                    </button>
                </div>
                {/* Quiz section */}
                <div className="w-1/2 h-full p-5 pl-0">
                    <div className="flex flex-col items-center justify-center w-full h-full bg-black/40 pt-10 rounded-2xl">
                        {quiz ? (
                            <div></div>
                        ) : (
                            <div className="opacity-50">No available quiz.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}