/* tslint:disable */
/* eslint-disable */
/**
*/
export class PostHeaders {
  free(): void;
/**
*/
  constructor();
/**
* @returns {any}
*/
  objectify(): any;
/**
* @returns {string}
*/
  readonly contentType: string;
/**
* @returns {string}
*/
  readonly sig: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_postheaders_free: (a: number) => void;
  readonly postheaders_new: () => number;
  readonly postheaders_sig: (a: number, b: number) => void;
  readonly postheaders_contentType: (a: number, b: number) => void;
  readonly postheaders_objectify: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
