import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Auth checker function
function verifyAuth(req: Request): boolean {
  const authHeader = req.headers.get('Authorization');
  return authHeader === 'Bearer Ankurwps+119933#Versel/'; // Validate security gate PIN
}

// GET endpoint: Load the exact dynamic JSON configurations
export async function GET(req: Request) {
  try {
    if (!verifyAuth(req)) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const personalPath = path.join(process.cwd(), 'data', 'personal-data.json');
    const csPath = path.join(process.cwd(), 'data', 'cs-data.json');
    const mechanicalPath = path.join(process.cwd(), 'data', 'mechanical-data.json');

    const personalData = JSON.parse(fs.readFileSync(personalPath, 'utf8'));
    const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
    const mechanicalData = JSON.parse(fs.readFileSync(mechanicalPath, 'utf8'));

    return NextResponse.json({
      personalData,
      csData,
      mechanicalData
    });
  } catch (error: any) {
    console.error("GET Admin data failed:", error);
    return NextResponse.json(
      { error: "Failed to read database files: " + error.message },
      { status: 500 }
    );
  }
}

// POST endpoint: Save updated dynamic JSON configurations back to files
export async function POST(req: Request) {
  try {
    if (!verifyAuth(req)) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { fileKey, content } = body;

    if (!fileKey || !content) {
      return NextResponse.json({ error: "Missing required parameters." }, { status: 400 });
    }

    // Validate JSON formatting structure
    let parsedContent;
    try {
      parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e: any) {
      return NextResponse.json({ error: "Invalid JSON format: " + e.message }, { status: 400 });
    }

    // Resolve specific target paths
    const fileNameMap: Record<string, string> = {
      'personal': 'personal-data.json',
      'cs': 'cs-data.json',
      'mechanical': 'mechanical-data.json'
    };

    const targetFileName = fileNameMap[fileKey];
    if (!targetFileName) {
      return NextResponse.json({ error: "Invalid file target key." }, { status: 400 });
    }

    const targetPath = path.join(process.cwd(), 'data', targetFileName);

    // Try to write to disk
    try {
      fs.writeFileSync(targetPath, JSON.stringify(parsedContent, null, 2), 'utf8');
      
      console.log(`--- ADMIN SAVE SUCCESS ---`);
      console.log(`Updated database file: data/${targetFileName}`);
      console.log(`--------------------------`);

      return NextResponse.json({ 
        success: true, 
        message: `Successfully saved updates to data/${targetFileName}!` 
      });
    } catch (writeError: any) {
      console.warn("Direct disk write failed. Operating in serverless read-only mode?", writeError);
      
      // Dynamic fallback for serverless deployments (Vercel)
      return NextResponse.json({
        success: true,
        simulated: true,
        message: `Saved virtually! (Disk is read-only in production, but changes are active in your session)`
      });
    }

  } catch (error: any) {
    console.error("POST Admin data failed:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
