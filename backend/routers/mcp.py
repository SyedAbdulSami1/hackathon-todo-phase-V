"""MCP router for exposing MCP tools via HTTP."""

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from typing import Dict, Any, List
import json
import asyncio
from tools.registry import tool_registry

router = APIRouter()

@router.post("/mcp")
async def handle_mcp_request(request: Request):
    """Handle MCP requests from Claude Desktop or other MCP clients."""
    try:
        body = await request.json()

        # Extract MCP protocol information
        method = body.get("method")
        params = body.get("params", {})
        id_ = body.get("id")

        response = {"jsonrpc": "2.0", "id": id_}

        if method == "initialize":
            # Initialize the MCP server
            response["result"] = {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "Todo MCP Server",
                    "version": "1.0.0"
                }
            }

        elif method == "tools/list":
            # List available tools
            tools = tool_registry.get_tool_definitions()
            response["result"] = {"tools": tools}

        elif method == "tools/call":
            # Execute a tool
            tool_name = params.get("name")
            arguments = params.get("arguments", {})

            if not tool_name:
                raise HTTPException(status_code=400, detail="Tool name required")

            # Execute the tool
            result = await tool_registry.execute_tool(tool_name, **arguments)
            response["result"] = {
                "content": [
                    {
                        "type": "text",
                        "text": json.dumps(result, indent=2)
                    }
                ]
            }

        else:
            raise HTTPException(status_code=400, detail=f"Unknown method: {method}")

        return JSONResponse(content=response)

    except Exception as e:
        error_response = {
            "jsonrpc": "2.0",
            "id": body.get("id") if isinstance(body, dict) else None,
            "error": {
                "code": -32603,
                "message": str(e)
            }
        }
        return JSONResponse(content=error_response, status_code=500)

@router.get("/mcp")
async def mcp_info():
    """Return MCP server information."""
    return {
        "protocolVersion": "2024-11-05",
        "capabilities": {
            "tools": {}
        },
        "serverInfo": {
            "name": "Todo MCP Server",
            "version": "1.0.0"
        }
    }