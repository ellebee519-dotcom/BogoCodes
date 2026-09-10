import { NextResponse } from 'next/server';

export function proxy() {
  // Pass-through everything with no security checks for local testing
  return NextResponse.next();
}