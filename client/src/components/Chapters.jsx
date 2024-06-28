import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chapters, parts, extractChapterNumber } from "@/data";
import "animate.css";
const Chapters = () => {
  return (
    <div className="animate__animated animate__fadeIn flex flex-col items-center justify-center font-sub_heading p-3 md:p-10 gap-10 dark:bg-slate-800 dark:text-darkModeTextClr">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Chapters</h1>
        <Path />
        <Tabs
          defaultValue="outline"
          className="w-[300px] sm:w-[500px] md:w-[750px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="outline">
            <Outline />
          </TabsContent>
          <TabsContent value="links">
            <Links />
          </TabsContent>
          <TabsContent value="resources">
            <Resources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Path from "./Path";

const Outline = () => {
  return (
    <div>
      <div className="text-lg">
        <h2>
          Here at the introduction section, you can find information, links etc.
          relating to HCI in general.
        </h2>
        <h2 className="mt-2">
          Choose a chapter from the menu on the left or from the list below to
          see exercises, resources and links for more specific topics.
        </h2>
      </div>
      <div className="mt-7">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold text-left">
              {parts[0]}
            </AccordionTrigger>
            <AccordionContent>
              {chapters.part1.map((chap) => (
                <Link
                  key={chap.href}
                  className="hover:underline"
                  to={`/chapters/${chap.href}`}
                >
                  <h3 className="text-base">
                    {extractChapterNumber(chap.href)}. {`${chap.title}`}
                  </h3>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-bold text-left">
              {parts[1]}
            </AccordionTrigger>
            <AccordionContent>
              {chapters.part2.map((chap) => (
                <Link
                  key={chap.href}
                  className="hover:underline"
                  to={`/chapters/${chap.href}`}
                >
                  <h3 className="text-base">
                    {extractChapterNumber(chap.href)}. {`${chap.title}`}
                  </h3>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold text-left">
              {parts[2]}
            </AccordionTrigger>
            <AccordionContent>
              {chapters.part3.map((chap) => (
                <Link
                  key={chap.href}
                  className="hover:underline"
                  to={`/chapters/${chap.href}`}
                >
                  <h3 className="text-base">
                    {extractChapterNumber(chap.href)}. {`${chap.title}`}
                  </h3>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold text-left">
              {parts[3]}
            </AccordionTrigger>
            <AccordionContent>
              {chapters.part3.map((chap) => (
                <Link
                  key={chap.href}
                  className="hover:underline"
                  to={`/chapters/${chap.href}`}
                >
                  <h3 className="text-base">
                    {extractChapterNumber(chap.href)}. {`${chap.title}`}
                  </h3>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

const Resources = () => {
  return (
    <div className="text-lg">
      <h3>
        See resources for each chapter for slides in PowerPoint format also
        student handouts as PDF either 3 up (3 slides plus room for notes,
        largest file 630K) or 6 up (6 slides per page, largest file 500K). You
        can also see all the slides together in the resources section.
      </h3>
      <h3 className="mt-3">
        If you want the slides for all the chapters, you can download them as a
        <a className="underline"> ZIP file </a>
        (11M) or
        <a className="underline"> tarball</a> (gz compressed tar file, 11M).
      </h3>
    </div>
  );
};

const Links = () => {
  return (
    <div className="text-lg">
      <ul className="list-disc space-y-2">
        <li className="mt-10 list-none">
          <h3 className="font-bold">Organisations</h3>
        </li>
        <li>
          <a className="underline">Interaction</a> the BCS Specialist Group on
          Interaction
        </li>
        <li>
          <a className="underline">ACM SIGCHI</a> Special Interest Group on
          Computer-Human Interaction
        </li>
        <li>
          <a className="underline">ACM SIGCHI Education Community –</a>
        </li>
        <li>
          The <a className="underline">Usability Professionals' Association</a>{" "}
          (UPA) - founded in US, with local chapters in the US and other
          countries
        </li>
        <li>
          Mikael Ericsson's listing of{" "}
          <a className="underline">research labs and projects world-wide</a>
        </li>
      </ul>
      <ul className="list-disc space-y-2">
        <li className="mt-10 list-none">
          <h3 className="font-bold">HCI Curriculum</h3>
        </li>
        <li>
          T
          <a className="underline">
            he future of HCI education: a flexible, global, living curriculum.
          </a>
          interactions article by Elizabeth Churchill, Anne Bowser, and Jennifer
          Preece, summarising the work of the SIGCHI Education Project
        </li>
        <li>
          <a className="underline">2011-2014 Education Project</a> includes
          various example syllabi rather than a single curriculum, reflecting
          the various styles and streams of work in the area
        </li>
        <li>
          <a className="underline">
            ACM (1992–1996) Curricula for Human-Computer Interaction
          </a>{" "}
          – some parts now very outdated, but still a useful resource alongside
          others – if something has been worth teaching for 20 years it may well
          be useful for another 20!
        </li>
      </ul>
      <ul className="list-disc space-y-2">
        <li className="mt-10 list-none">
          <h3 className="font-bold">Publications</h3>
        </li>
        <li>
          <a className="underline">SIGCHI Bulletin</a> contents and PDF archives
          (1999-2003)
        </li>
        <li>
          <a className="underline">
            ACM SIGCHI Curricula for Human-Computer Interaction
          </a>{" "}
          -1992 Report of the Curriculum Development Group
        </li>
        <li>
          Ajournals: <a className="underline">IwC</a> (Interacting with
          Computers), HCI (Human-Computer Interaction journal),{" "}
          <a className="underline">ACM TOCHI</a> (Transaction on Computer-Human
          Interaction), <a className="underline">IJHCS</a> (International
          Journal of Human-Computer Studies)
        </li>
        <li>
          <a className="underline">ACM Interactions online</a>
        </li>
        <li>
          <a className="underline">UsabilityNews</a> online newsletter
        </li>
        <li>
          <a className="underline">PDF archives of Interfaces</a> (British HCI
          Group magazine)
        </li>
        <li>
          <a className="underline">TeamEthno-Online</a> an online journal on all
          things ethnographic
        </li>
        <li>
          <a className="underline">Ubiquity</a> - ACM online magazine (general
          IT topics, but lots relevant to HCI)
        </li>
      </ul>
    </div>
  );
};

export default Chapters;
