<?php 
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';

	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->IsHTML(true);

	// от кого письмо
	$mail->setFrom('info@' . $_SERVER['HTTP_HOST'], 'МК Шкафы');
	// кому отправить
	$admin_email  = ['aldjanaliev@gmail.com','quiz24-job@yandex.ru'];
	// $admin_email  = ['quiz24-job@yandex.ru', 'info@terminator.ru'];
	foreach ( $admin_email as $key => $value ) {
		$mail->addAddress($value);
	}
	$form_subject = 'Заявка с сайта mk-shkaf.ru';
	$mail->Subject = $form_subject;

	$c = true;
	$message = '';
	// $message2 = '';
	foreach ( $_POST as $key => $value ) {
		if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
			if (is_array($value)) {
				$val_text = '';
				foreach ($value as $val) {
					if ($val && $val != '') {
						$val_text .= ($val_text==''?'':', ').$val;
					}
				}
				$value = $val_text;
			}
			// $message2 .= "{$key}: {$value} \n";

			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
			<td style='padding: 10px; width: auto;'><b>$key:</b></td>
			<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";

		}
	}

	$message = "<table style='width: 50%;'>$message</table>";

	// if(!empty($_FILES['file']['tmp_name'])){
	// 	$filePath = __DIR__ . "/upload/" . $_FILES['file']['name'];
	// 	if(copy($_FILES['file']['tmp_name'], $filePath)){
	// 		$fileAttach = $filePath;
	// 		$message .= '<p><b>Файл в приложении:</b></p>';
	// 		$mail->addAttachment($fileAttach);
	// 	}
	// }
	
	$body = $message;
	// $mail->isHTML(true);  это если прям верстка
	$mail->msgHTML($body);

	$mail->send();

	$response = ['message' => $message];
	echo json_encode($response);

	require_once ('query/index.php');