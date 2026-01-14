import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const newUser = await request.json();
        
       
        const filePath = path.join(process.cwd(), 'public', 'data', 'user.json');
        
        
        const fileData = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileData);
        
   
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        newUser.id = lastId + 1;

      
        users.push(newUser);
        
     
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
        
        return NextResponse.json({ message: "Ghi dữ liệu thành công" }, { status: 200 });
    } catch (error) {
        console.error("Lỗi ghi file:", error);
        return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
    }
}