export default class ReportGeneratorController {

    tex_string = '';
    iBCDSI = '';
    iBCSPI = '';
    iCoSeCo = '';
    iCoPaCo = '';
    iCoPa = '';
    iThSpu = '';
    iEstSerFra = '';
    iTub = '';
    iNuMA = '';
    iNoCom = '';
    iTCRAProc = '';
    iTCRAProSize = '';
    iSCRA = '';
    iECRA = '';
    iKFRA = '';
    iMSPO = '';
    iMWRA = '';
    iCCRA = '';
    iFSRA = '';
    iSraRA = '';
    iLBRA = '';
    iSyncRA = '';
    iGRA = '';
    iScaRA = '';
    iAOC = '';
    iCBMB = '';
    iADDADA = '';
    iDFIA = '';
    iAAC = '';

    constructor($http) {
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';

        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;
    }

    generate_report() {
        var download = document.createElement('a');
        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;
        download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.tex_string);
        download.download = 'report.tex';
        download.click();
    }

    clear_report() {
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';
        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;
    }
}
