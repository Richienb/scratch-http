/* global Scratch */
/// <reference types="scratch-env"/>

import ky from "ky"

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
						menu: "method",
						defaultValue: "GET"
					},
					url: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&format=plain"
					}
				}
			}],
			menus: {
				method: {
					items: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"]
				} as unknown as ExtensionMenuMetadata // TODO: Remove when https://github.com/LLK/scratch-vm/issues/2582 is closed.
			}
		}
	}

	async httpRequest({method, url}: {method: string, url: string}) {
		return await ky(url, {method}).text()
	}
}

Scratch.extensions.register(new ScratchHTTP())
