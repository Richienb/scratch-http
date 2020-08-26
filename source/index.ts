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

	async httpRequest({method, url}: {method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head', url: string}) {
		return await ky(url, {method}).text()
	}
}

Scratch.extensions.register(new ScratchHTTP())
