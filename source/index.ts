/* global Scratch */
/// <reference types="scratch-env"/>

import retus from "retus"

class ScratchHTTP implements ScratchExtension {
	getInfo(): ExtensionMetadata {
		return {
			id: "ScratchHTTP",
			name: "HTTP Requests",
			blocks: [{
				opcode: "httpRequest",
				blockType: Scratch.BlockType.REPORTER,
				text: "HTTP [method] [url]",
				arguments: {
					method: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "GET"
					},
					url: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&format=plain"
					}
				}
			}]
		}
	}

	httpRequest({ method, url }: { method: retus.HTTPMethod, url: string }): string {
		return retus<string>(url, { method }).body
	}
}

Scratch.extensions.register(new ScratchHTTP())
