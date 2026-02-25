<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $service = app(App\Services\OpenRouterService::class);
    $svg = $service->generateLogo('Test', null, null, ['#000000'], null);
    echo "SUCCESS:\n" . substr($svg, 0, 100);
} catch (\Throwable $e) {
    echo "ERROR: " . get_class($e) . "\nMessage: " . $e->getMessage() . "\nTrace:\n" . $e->getTraceAsString();
}
