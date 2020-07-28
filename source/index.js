/* global Scratch */

import retus from "retus"

class ScratchHTTP {
	getInfo() {
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

	httpRequest({ method, url }) {
		return retus(url, { method }).body
	}
}

Scratch.extensions.register(new ScratchHTTP())
