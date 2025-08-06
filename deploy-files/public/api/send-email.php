<?php
// تفعيل تسجيل الأخطاء
ini_set('display_errors', 0); // تعطيل عرض الأخطاء للمستخدم
error_reporting(E_ALL);
error_log("=== New Request Started ===");
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Request Headers: " . json_encode(getallheaders()));

// إعدادات CORS محدثة
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
    header('Access-Control-Max-Age: 86400');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit(0);
}

// الهيدرز الأساسية
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

// تحميل متغيرات البيئة
$env_path = '/home/u421487616/domains/lifehorizonit.com/public_html/.env';
error_log("Loading .env from: " . $env_path);

if (!file_exists($env_path)) {
    error_log("Error: .env file not found at: " . $env_path);
    http_response_code(500);
    echo json_encode(['error' => 'Configuration file not found']);
    exit;
}

$env = parse_ini_file($env_path);
if (!$env || !isset($env['RESEND_API_KEY'])) {
    error_log("Error: RESEND_API_KEY not found in .env file");
    http_response_code(500);
    echo json_encode(['error' => 'API key configuration missing']);
    exit;
}

$RESEND_API_KEY = $env['RESEND_API_KEY'];
error_log("API Key loaded successfully");

// التحقق من طريقة الطلب
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// قراءة البيانات المرسلة
$input = file_get_contents('php://input');
error_log("Received raw data: " . $input);
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// التحقق من البيانات المطلوبة
if (!isset($data['fullName']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['course'])) {
    error_log("Missing required fields in request data");
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// تجهيز البيانات
$fullName = $data['fullName'];
$email = $data['email'];
$phone = $data['phone'];
$course = $data['course'];

error_log("Processing registration for: " . $fullName . " (" . $email . ")");

// تجهيز رسالة المسؤول
$adminEmailData = [
    'from' => 'Resend <onboarding@resend.dev>',
    'to' => ['info@lifehorizonit.com'],
    'reply_to' => $email,
    'subject' => "تسجيل جديد في $course - " . $fullName,
    'html' => "
        <div dir='rtl' style='font-family: Arial, sans-serif; line-height: 1.6;'>
            <h2>تسجيل جديد في الدورة</h2>
            <p>تم استلام تسجيل جديد بالتفاصيل التالية:</p>
            <ul>
                <li>الاسم: $fullName</li>
                <li>البريد الإلكتروني: $email</li>
                <li>رقم الهاتف: $phone</li>
                <li>الدورة: $course</li>
            </ul>
            <p>يرجى التواصل مع المتقدم في أقرب وقت ممكن.</p>
        </div>
    "
];

// تجهيز نسخة من رسالة المستخدم
$userEmailPreviewData = [
    'from' => 'Resend <onboarding@resend.dev>',
    'to' => ['info@lifehorizonit.com'],
    'reply_to' => 'info@lifehorizonit.com',
    'subject' => "نسخة من رسالة التأكيد - " . $fullName,
    'html' => "
        <div dir='rtl' style='font-family: Arial, sans-serif; line-height: 1.6;'>
            <h2>نسخة من رسالة التأكيد التي ستُرسل للمستخدم</h2>
            <hr>
            <div style='background-color: #f5f5f5; padding: 20px; border-radius: 8px;'>
                <h2>مرحباً $fullName،</h2>
                <p>نشكرك على تسجيلك في $course لدى شركة أفق الحياة.</p>
                <p>تم استلام طلب التسجيل الخاص بك وسيتم مراجعته من قبل فريقنا.</p>
                <p>سنقوم بالتواصل معك قريباً على رقم هاتفك $phone لتأكيد التسجيل وتحديد موعد بدء الدورة.</p>
                <br/>
                <p>مع تحيات،</p>
                <p>فريق شركة أفق الحياة</p>
            </div>
        </div>
    "
];

error_log("Preparing to send emails via Resend API");

// إرسال رسالة المسؤول
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($adminEmailData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $RESEND_API_KEY,
    'Content-Type: application/json'
]);

$adminResponse = curl_exec($ch);
$adminHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

error_log("Admin email response code: " . $adminHttpCode);
error_log("Admin email response: " . $adminResponse);

// إرسال نسخة من رسالة المستخدم
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userEmailPreviewData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $RESEND_API_KEY,
    'Content-Type: application/json'
]);

$userPreviewResponse = curl_exec($ch);
$userPreviewHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

error_log("User preview email response code: " . $userPreviewHttpCode);
error_log("User preview email response: " . $userPreviewResponse);

// تحليل الاستجابات
$adminResponseData = json_decode($adminResponse, true);
$userPreviewResponseData = json_decode($userPreviewResponse, true);

if ($adminHttpCode !== 200 || $userPreviewHttpCode !== 200) {
    error_log("Error sending one or both emails");
    $errors = [];
    if ($adminHttpCode !== 200) {
        $errors[] = isset($adminResponseData['message']) ? $adminResponseData['message'] : 'Failed to send admin notification';
    }
    if ($userPreviewHttpCode !== 200) {
        $errors[] = isset($userPreviewResponseData['message']) ? $userPreviewResponseData['message'] : 'Failed to send user preview';
    }
    echo json_encode(['error' => implode(', ', $errors)]);
} else {
    error_log("Both emails sent successfully");
    echo json_encode(['success' => true, 'message' => 'Emails sent successfully']);
}

error_log("=== Request Completed ==="); 