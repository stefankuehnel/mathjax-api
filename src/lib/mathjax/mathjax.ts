import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";
import { LiteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
import { LiteElement } from "mathjax-full/js/adaptors/lite/Element";
import { MathDocument } from "mathjax-full/js/core/MathDocument";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
import { SVG } from "mathjax-full/js/output/svg";
import { TeX } from "mathjax-full/js/input/tex";

import { mathjax } from "mathjax-full/js/mathjax";

import { optimize } from "svgo";

import * as Cheerio from "cheerio";
import SanitizeHTML from "sanitize-html";

export class Mathjax {
  private readonly liteAdaptor: LiteAdaptor;
  private readonly mathDocument: MathDocument<any, any, any>;

  constructor() {
    this.liteAdaptor = new LiteAdaptor();

    RegisterHTMLHandler(this.liteAdaptor);

    this.mathDocument = mathjax.document("", {
      InputJax: new TeX({ packages: AllPackages }),
      OutputJax: new SVG({ fontCache: "none" }),
    });
  }

  private convertTexToSVG(tex: string, display?: boolean) {
    const liteElement = this.mathDocument.convert(tex, {
      display,
    }) as LiteElement;

    return this.liteAdaptor.innerHTML(liteElement);
  }

  private convertTextToSVG(text: string) {
    return this.convertTexToSVG(`\\color{red}{\\text{${text}}}`);
  }

  private extractError(svg: string) {
    const $ = Cheerio.load(svg);

    const errorNodes = $('[data-mml-node="merror"]');

    if (errorNodes.length > 0) {
      return errorNodes.attr("data-mjx-error");
    }

    return null;
  }

  private addTitle(svg: string, title: string) {
    const $ = Cheerio.load(svg, { xml: true });

    title = SanitizeHTML(title, {
      disallowedTagsMode: "escape",
    });

    $("svg").prepend(`<title>${title.trim()}</title>`);

    return $.xml();
  }

  private optimize(svg: string) {
    const { data } = optimize(svg);

    return data;
  }

  private postProcess(
    svg: string,
    ...postProcessors: Array<(it: string) => string>
  ) {
    return postProcessors.flat().reduce((acc, fn) => fn(acc), svg);
  }

  public getSVG(tex: string, display?: boolean) {
    const svg = this.convertTexToSVG(tex, display);
    const error = this.extractError(svg);

    if (error) {
      const svgError = this.convertTextToSVG(error);

      return this.postProcess(
        svgError,
        (it: string) => this.addTitle(it, error),
        (it: string) => this.optimize(it),
      );
    }

    return this.postProcess(
      svg,
      (it: string) => this.addTitle(it, tex),
      (it: string) => this.optimize(it),
    );
  }
}
