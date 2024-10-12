# Compressa - Free Image Compression for Faster Websites

Compressa is a powerful, user-friendly web application that allows you to compress and optimize your images for free, resulting in faster-loading websites and improved user experience.

## Features

- Compress multiple images simultaneously (up to 20 files)
- Support for various image formats: JPEG, PNG, and WebP
- Efficient compression using FFmpeg
- Simple drag-and-drop interface
- Instant download of compressed images
- Detailed compression results, including file size reduction

## Technologies Used

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- FFmpeg for image compression

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/compressa-app.git
   cd compressa-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/components`: Reusable React components
- `src/lib`: Utility functions and shared logic
- `public`: Static assets

## Key Components

- `src/app/page.tsx`: Main page component
- `src/components/ffmpeg-client.tsx`: Handles image compression using FFmpeg
- `src/components/compression-results.tsx`: Displays compression results

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for UI components
- [FFmpeg](https://ffmpeg.org/) for image compression capabilities

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/aleksihuusko/compressa-app](https://github.com/aleksihuusko/compressa-app)
