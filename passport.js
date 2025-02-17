// Import passport và Google OAuth Strategy để xử lý xác thực với Google
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Cấu hình passport để sử dụng Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // ID ứng dụng Google từ biến môi trường
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Secret ứng dụng Google từ biến môi trường
      callbackURL: "http://localhost:3000/auth/google/callback", // URL callback sau khi đăng nhập thành công
    },
    (accessToken, refreshToken, profile, done) => {
      // Khi đăng nhập thành công, Google trả về thông tin user (profile)
      // Gọi `done()` để tiếp tục xử lý, ở đây chúng ta chỉ đơn giản trả về profile của user
      return done(null, profile);
    }
  )
);

// Serialize user - Lưu thông tin user vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user - Lấy thông tin user từ session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
